# MazeMaker
An implementation of depth-first search and recursive backtracking using JavaScript and Java.
Generates a maze.
By default uses an aspect ratio of 16:9 -- the best aspect ratio.

The idea for this was taken from Dan Shiffman's videos, and the method for implementation of the algorithm was taken from https://en.wikipedia.org/wiki/Maze_generation_algorithm.


The system now has an option to solve the maze once it has been generated.
Solving the maze uses the same backtracking method, but uses an heuristic to optimise its search pattern.

The maze solver uses the A\* algorithm.
