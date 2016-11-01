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
  cell.gCost = 0;
  cell.searched = true;
  closedList.push(cell);
}
// Function to set the g-cost of a cell.
function setGcost(cell) {
  cell.gCost = grid[cell.Parent].gCost + 1;
}
// Function to set the f-cost of a cell.
function setFcost(cell) {
  cell.fCost = cell.heuristic + cell.gCost;
}
// Function to get the Manhattan heuristic distance between 2 cells.
function manhattanDist(cell1, goal) {
  return (Math.abs(cell1.i - goal.i) + Math.abs(cell1.j - goal.j));
}

function getChildren(cell) {
  var neighbors = cell.getValidOptions(); // Get the neighbors.
  for (var i = 0; i < neighbors.length; i++) {
    if (!contains(openList, neighbors[i])) {
      openList.push(neighbors[i]);
    }
  }
}
