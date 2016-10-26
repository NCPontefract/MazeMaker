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
    //if (!(contains(solveStack, cell))) {
    if (!cell.solved) {
      //console.log("Pushing to stack...");
      solveStack.push(cell);
    }
    //console.log(solveStack[solveStack.length-1]);
    for (var i = 0; i < solveStack.length; i++) {
      solveStack[i].display(MAGENTA);
    }
    cell.display(BLUE);
    goal.display(YELLOW);
    //console.log(grid);
    //console.log(cell);
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
    var finalCell;
    for (var i = 0; i < options.length; i++) {
      if (!curBest) {
        var curBest = values[i];
        nextCell = options[i];
      } else if (values[i] < curBest) {
        curBest = values[i];
        nextCell = options[i];
      }
      if (values[i] == 0) {
        //console.log("Finished?");
        finalCell = options[i];
      }
    }
    // This should work.
    if (options.length == 0) {
      //console.log("Backtracking...");
      nextCell = solveStack.pop();
    }
    if (finalCell) {
      //console.log("Trying to finish.");
      nextCell = finalCell;
    }
    if (!(cell == goal)) {
      //console.log("looping...");
      setTimeout(function() {findParent(nextCell, grid);}, 5);
    }
    console.log("Loop number: " + solveStack.length);
    return nextCell;
  }

  // Do stuff here.
  var solveStack = [];
  //var goal = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid[0].length)]; // The target cell.
  var goal = grid[grid.length-1][grid[0].length-1];
  //console.log(grid);
  var start = grid[0][0]; // The start cell.
  for (var i = 0; i < grid[0].length; i++) {
    for (var j = 0; j < grid.length; j++) {
      grid[j][i].heuristic = manhattanDist(grid[j][i], goal);
    }
  }
  var next = findParent(grid[0][0], grid);
  //for (var i = 0; i < 15; i++) {
  //next = findParent(heuristics, next, grid);

}
