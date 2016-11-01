# MazeMaker
An implementation of depth-first search and recursive backtracking using JavaScript.
Generates a maze.
By default uses an aspect ratio of 16:9 -- the best aspect ratio.

The idea for this was taken from Dan Shiffman's videos, and the method for implementation of the algorithm was taken from https://en.wikipedia.org/wiki/Maze_generation_algorithm.


The system now has an option to solve the maze once it has been generated.
Solving the maze uses the same backtracking method, but uses an heuristic to optimise its search pattern.

~~I tried to use the A\* search algorithm, but I don't think I quite managed to make this as efficient as A\* should be.~~
The maze solver now uses the A\* algorithm.
