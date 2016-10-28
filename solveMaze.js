  // Here is where I will implement the A* search.

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

function solveMaze() {
  // Function to get the Manhattan heuristic distance between 2 cells.
  function manhattanDist(cell1, goal) {
    return (Math.abs(cell1.i - goal.i) + Math.abs(cell1.j - goal.j));
  }

  // Function to return which viable neighbor cell has the lowest "cost" from the start cell.
  // this.will be used as the next cell to check.
  function findParent(cell, grid) {
    if (!cell.solved) {
      solveStack.push(cell);
    }
    for (var i = 0; i < solveStack.length; i++) {
      solveStack[i].display(MAGENTA);
    }
    cell.display(BLUE);
    goal.display(YELLOW);
    start.display(GREEN);
    cell.solved = true;
    var index = cell.i + columns * cell.j;
    // Get unused options only.
    var options = cell.getValidOptions();
    var values = [];
    for (var i = 0; i < options.length; i++) {
      values.push(options[i].heuristic);
    }
    var nextCell;
    // Get best cell.
    // Some weird error is occuring here in a special case where the solver doesn't
    // notice a neighbor, leading to an unsolved maze.
    // This seems to happen to cells with no walls - all 4 neighbord available.
    // And the neighbor with the worst heuristic isn't incuded in the array returned
    // by the getValidOptions function.
    var finalCell;
    //console.log(cell);
    //console.log(options);
    for (var i = 0; i < options.length; i++) {
      if (!curBest) {
        var curBest = values[i];
        nextCell = options[i];
      } else if (values[i] < curBest) {
        curBest = values[i];
        nextCell = options[i];
      }
      if (values[i] == 0) {
        finalCell = options[i];
      }
      if (options.length == 1) {
        nextCell = options[0];
      }
    }
    // This should work.
    if (options.length == 0) {
      nextCell = solveStack.pop();
    }
    if (options.length == 3) {
      console.log("Problem!");
      problem = true;
    }
    if (finalCell) {
      nextCell = finalCell;
    }
    if (!(cell == goal)) {
      setTimeout(function() {findParent(nextCell, grid);}, 30);
    } else {
      console.log("Finished");
      console.log(problem);
    }
    console.log("Loop number: " + solveStack.length);
    return nextCell;
  }

  // Do stuff here.
  var solveStack = [];
  var problem = false;
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
  var next = findParent(start, grid);

}

function trySolve(event) {
  if (event.keyCode == 32) {
  console.log("Trying to solve...");
    if (built == true) {
      solveMaze();
    } else {
      console.log("Maze isn't fully built.")
    }
  }
}
