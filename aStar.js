// Function to check if an array contains an object.
function contains(a, obj) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] == obj) {
      //alert();
      return true;
    }
  }
  return false;
}

// This is where I will implement the A* search algorithm in order to optimise finding a shortest solution.

var openList = [];
var closedList = [];

// Function to add the first cell to the closed list.
function startPath(cell) {
  closedList = [];
  openList = [];
  cell.gCost = 0;
  cell.searched = true;
  closedList.push(cell);
  cell.solved = true;
}
// Function to set the g-cost of a cell.
function setGcost(cell) {
  cell.gCost = cell.parent.gCost + 1;
}
// Function to set the f-cost of a cell.
function setFcost(cell) {
  cell.fCost = cell.heuristic*cell.heuristic + cell.gCost;
}
// Function to get the Manhattan heuristic distance between 2 cells.
function manhattanDist(cell1, goal) {
  return (Math.abs(cell1.i - goal.i) + Math.abs(cell1.j - goal.j));
}

// Function to check if new route to a cell is better than current.
// and set the cell's parent, g-cost, and f-cost accordingly.
function checkNewParent(cell, parent) {
  // If parent exists and cell's g-cost is lower using new parent.
  if (cell.parent) {
    if (cell.gCost > parent.gCost + 1) {
      cell.parent = parent;
      setGcost(cell);
      setFcost(cell);
    }
  } else {
    cell.parent = parent;
    setGcost(cell);
    setFcost(cell);
  }
}

// Function to add a cell's valid children to the open list.
function getChildren(cell) {
  var neighbors = cell.getValidOptions(); // Get the neighbors.
  for (var i = 0; i < neighbors.length; i++) {
    checkNewParent(neighbors[i], cell);
    if (!neighbors[i].fCost) {
      // Set the f-cost of the neighbor.
      setGcost(neighbors[i]);
      setFcost(neighbors[i]);
    }
    checkNewParent(neighbors[i], cell);
    // If the cell isn't in the open list...
    if (!contains(openList, neighbors[i])) {
      // ...add the cell to the open list.
      //neighbors[i].solved = true;
      openList.push(neighbors[i]);
    }
  }
}

// Function to return the cell with the lowest f-cost in the open list.
function getLowest() {
  var lowest = openList[0];
  for (var i = 0; i < openList.length; i++) {
    if (openList[i].fCost < lowest.fCost) {
      lowest = openList[i];
    }
  }
  return lowest;
}

// Function to retrace the final path.
function tracePath(path, cell) {
  path.push(cell);
  for (var i = 0; i < path.length; i++) {
    if (path[i]) {
      path[i].display("100,100,100,");
    }
  }
  if (cell.parent) {
    setTimeout(function(){tracePath(path, cell.parent);}, 10);
  }
}

// Function to iterate to solve the maze.
function solveLoop(start, goal) {
  //clearCanv(BACKCOL);
  //displayGrid();
  for (var i = 0; i < closedList.length; i++) {
    //closedList[i].display(MAGENTA);
    getChildren(closedList[i]); // When I remove this it breaks the thing.
  }
  for (var i = 2; i < openList.length; i++) {
    openList[i].display(RED);
  }
  goal.display(YELLOW);
  start.display(GREEN);
  var nextCell = getLowest();
  if (contains(openList, goal)) {
    nextCell = goal;
  }
  getChildren(nextCell);
  //nextCell.display(BLUE);
  openList.splice(nextCell, 1);
  closedList.push(nextCell);
  nextCell.display(MAGENTA);
  nextCell.solved = true;
  getChildren(nextCell);
  if (!contains(closedList, goal)) {
    setTimeout(function(){solveLoop(start, goal);}, 1)
  } else {
    var path = [];
    setTimeout(function(){tracePath(path, goal);}, 10);
  }
}

function solveAStar() {
  clearCanv(BACKCOL);
displayGrid();
  var goal = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid[0].length)]; // The target cell.
  //var goal = grid[grid.length-1][grid[0].length-1];
  var start = grid[0][0]; // The start cell.
  //var start = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid[0].length)]; // The start cell.
  for (var i = 0; i < grid[0].length; i++) {
    for (var j = 0; j < grid.length; j++) {
      grid[j][i].heuristic = manhattanDist(grid[j][i], goal);
      grid[j][i].solved = false;
    }
  }
  
  startPath(start);
  getChildren[start];
  //clearCanv(BACKCOL);
  //displayGrid();
  for (var i = 0; i < closedList.length; i++) {
    closedList[i].display(MAGENTA);
  }
  goal.display(YELLOW);
  start.display(GREEN);
  getChildren(start);
  var nextCell = getLowest();
  nextCell.parent = start;
  nextCell.display(BLUE);
  openList.splice(nextCell, 1);
  closedList.push(nextCell);
  getChildren(nextCell);
  solveLoop(start, goal);
}

function tryStarSolve(event) {
  if (event.keyCode == 32) {
  console.log("Trying to solve...");
    if (built == true) {
      solveAStar();
    } else {
      console.log("Maze isn't fully built.")
    }
  }
}
