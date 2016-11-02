// Taken from https://en.wikipedia.org/wiki/Maze_generation_algorithm.
// 1. Make the initial cell the current cell and mark it as visited.
// 2. While there are unvisited cells.
//    1. If the current cell has any neighbours which have not been visited.
//        1. Choose randomly one of the unvisited neighbours.
//        2. Push the current cell to the stack.
//        3. Remove the wall between the current cell and the chosen cell.
//        4. Make the chosen cell the current cell and mark it as visited.
//    2. Else if stack is not empty.
//        1. Pop a cell from the stack.
//        2. Make it the current cell.

// TODO: A* algorithm.

const WHITE = "255,255,255,";
const BLACK = "0,0,0,";
const RED = "255,0,0,";
const GREEN = "0,255,0,";
const BLUE = "0,0,255,";
const BACKCOL = "32,32,32,";
const AQUA = "0,255,255,";
const MAGENTA = "255,0,255,";
const YELLOW = "255,255,0,";

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");

var stack = [];
var current;

// cell.js start.
// Imported to same file for ease of use. Could be separated for further encapsulation,
// but some function calls between files would be broken depending on the order in which
// the two files are included in index.html
function Cell(i, j) {
  this.heuristic;
  this.parent;
  this.gCost;
  this.fCost;
  this.solved = false; // Whether or not this cell is part of a 'solution'. For the greedy solver.
  this.i = i;
  this.j = j;
  this.x = i * SIZE;
  this.y = j * SIZE;
  this.visited = false;
  //           top, right, bottom, left.
  this.walls = [true, true, true, true];

  // Function to return an array of un-solved neighbors.
  this.getValidOptions = function() {
    var neighbors = [];
    //top.
    if (!this.walls[0]) {
      neighbors.push(grid[this.j-1][this.i]);
    }
    //right.
    if (!this.walls[1]) {
      neighbors.push(grid[this.j][this.i+1]);
    }
    //bottom.
    if (!this.walls[2]) {
      neighbors.push(grid[this.j+1][this.i]);
    }
    //left.
    if (!this.walls[3]) {
      neighbors.push(grid[this.j][this.i-1]);
    }
    var valid = [];
    for (var i = 0; i < neighbors.length; i++) {
      if (neighbors[i].solved == false) {
        valid.push(neighbors[i]);
      }
    }
    return valid;
  }

  // Function to return a random unvisited neighbor.
  this.checkNeighbors = function() {
    var neighbors = [];
    // Define the sides as cells.
    if (j > 0) {
      var top    = grid[this.j-1][this.i];
    }
    if (i < grid[j].length - 1) {
      var right  = grid[this.j][this.i+1];
    }
    if (j < grid.length - 1) {
      var bottom = grid[this.j+1][this.i];
    }
    if (i > 0) {
      var left   = grid[this.j][this.i-1];
    }
    // Check the cells haven't been visited.
    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    // Get a random neighbor.
    if (neighbors.length > 0) {
      var r = Math.floor(Math.random() * neighbors.length);
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  this.display = function(col) {
    var color = BACKCOL;
    var pathCol = GREEN;
    var visitedCol = BLACK;
    if (this.visited) {
      color = visitedCol;
    }
    if (col) {
      color = col;
    }
    // Top wall.
    if (this.walls[0]) {
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x+SIZE, this.y);
      context.strokeStyle = "rgba(" + pathCol + "1" + ")";
      context.stroke();
    }
    // Right wall.
    if (this.walls[1]) {
      context.beginPath();
      context.moveTo(this.x+SIZE, this.y);
      context.lineTo(this.x+SIZE, this.y+SIZE);
      context.strokeStyle = "rgba(" + pathCol + "1" + ")";
      context.stroke();
    }
    // Bottom wall.
    if (this.walls[2]) {
      context.beginPath();
      context.moveTo(this.x+SIZE, this.y+SIZE);
      context.lineTo(this.x, this.y+SIZE);
      context.strokeStyle = "rgba(" + pathCol + "1" + ")";
      context.stroke();
    }
    // Left wall.
    if (this.walls[3]) {
      context.beginPath();
      context.moveTo(this.x, this.y+SIZE);
      context.lineTo(this.x, this.y);
      context.strokeStyle = "rgba(" + pathCol + "1" + ")";
      context.stroke();
    }
    context.fillStyle = "rgba(" + color + "1" + ")";
    context.fillRect(this.x, this.y, SIZE, SIZE);
  }

}
// End of cell.js

// Function to remove walls between two cell objects.
function removeWalls(curr, next) {
  var idist = curr.i - next.i;
  var jdist = curr.j - next.j;
  if (idist === 1) {
    curr.walls[3] = false;
    next.walls[1] = false;
  } else if (idist === -1) {
    curr.walls[1] = false;
    next.walls[3] = false;
  } else if (jdist === 1) {
    curr.walls[0] = false;
    next.walls[2] = false;
  } else if (jdist === -1) {
    curr.walls[2] = false;
    next.walls[0] = false;
  }
}

// Function to fill the canvas with a given color and 100% alpha.
function clearCanv(col) {
  context.fillStyle = "rgba(" + col + "1" + ")";
  context.fillRect(0, 0, width, height);
}

// Function to create the 2D array to use for the grid.
function makeGrid() {
  var grid = [];
  for (var j = 0; j < rows; j++) {
    row = [];
    for (var i = 0; i < columns; i++) {
      row.push(new Cell(i, j));
      // 2D array.
    }
    grid.push(row);
  }
  return grid;
}

// Function to display the grid.
function displayGrid() {
  clearCanv(BACKCOL);
  for (var j = 0; j < grid.length; j++) {
    for (var i = 0; i < grid[j].length; i++) {
      // Display each cell here.
      if (grid[j][i] == current) {
        grid[j][i].display(GREEN);
      } else {
        grid[j][i].display();
      }
    }
  }
}

// Loop to call iteratively.
function mazeLoop() {
  displayGrid();
  document.getElementById("textout").innerHTML = "Stack size: " + stack.length;
  current.visited = true;
  var next = current.checkNeighbors();
  if (next) {
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    // If dead end.
    current = stack.pop();
  }
  if (!(current == grid[0][0])) {
    setTimeout(mazeLoop, 0);
  } else {
    displayGrid();
    current.display();
    document.getElementById("buttonzone").innerHTML = "<button id=\"solveButton\"onclick=\"solveAStar()\" onkeypress=\"solveMaze()\">Solve A*.</button>";
    document.getElementById("buttonzone").innerHTML += "<button id=\"solveButton\"onclick=\"solveMaze()\" onkeypress=\"solveMaze()\">Inefficient solve.</button>";
    console.log("Done!");
    built = true;
    //setTimeout(function() {alert("Maze Generated!");}, 100);
    document.getElementById("textout").innerHTML = "Stack size: " + stack.length;
  }
}

// Do stuff here.
function drawMaze() {
  grid = makeGrid();
  current = grid[0][0];
  clearCanv(WHITE);
  setTimeout(mazeLoop, 500);
}
var grid = [];
var built = false;
const SIZE = 8;
var columns = Math.floor(width / SIZE);
var rows = Math.floor(height / SIZE);
drawMaze();
