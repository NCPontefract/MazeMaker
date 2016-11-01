// This is where I will implement the A* search algorithm in order to optimise finding a shortest solution.

var openList = [];
var closedList = [];

// Function to add the first cell to the closed list.
function startPath(cell) {
  closedList = [];
  cell.gCost = 0;
  cell.searched = true;
  closedList.push(cell);
}
function setGcost(cell) {
  cell.gCost = grid[cell.Parent].gCost + 1;
}
