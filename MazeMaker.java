package mazemaker;

import javax.swing.BorderFactory;
import java.awt.*;
import java.awt.event.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.*;
import javax.swing.border.Border;

public class MazeMaker {
    // Global constants.
    public static final int PIXELS = 20;
    public static final int XDIM = 640;
    public static final int YDIM = 360;
    public static final int CELLSX = Math.floorDiv(XDIM, PIXELS);
    public static final int CELLSY = Math.floorDiv(YDIM, PIXELS);
    
    public static JFrame wFrame;
    public static JPanel window;
    public static Cell[][] grid;

    public static void main(String[] args) {
        Border border = BorderFactory.createMatteBorder(1,1,1,1,Color.BLACK);
        // Setup the window.
        wFrame = new JFrame("Insert Maze pun here.");
        window = new JPanel(new GridLayout(CELLSY, CELLSX));
        wFrame.add(window);
        grid = MazeMaker.makeGrid();
        for (int y = 0; y < grid[0].length; y++) {
            for(int x = 0; x < grid.length; x++) {
                grid[x][y].panel = new JPanel();
                window.add(grid[x][y].panel);
                Border paneEdge = BorderFactory.createMatteBorder(1,1,1,1, Color.GREEN);
                grid[x][y].panel.setBorder(paneEdge);
                grid[x][y].panel.setVisible(true);
            }
        }
        wFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        Cell current = grid[0][0];
        MazeMaker.makeMaze();
    } // End main method.
    public static void makeMaze() {
        wFrame.pack();
        wFrame.setSize(XDIM, YDIM);
        wFrame.setVisible(true);
        window.setVisible(true);
        MazeMaker.display(grid);
    }
    // Make the empty grid ready for maze generation.
    public static Cell[][] makeGrid() {
        Cell[][] cellArray = new Cell[CELLSX][CELLSY];
        for (int x = 0; x < CELLSX; x++) {
            for (int y = 0; y < CELLSY; y++) {
                int[] coords = {x,y};
                cellArray[x][y] = new Cell(coords, PIXELS);
            } // End for.
        } // End for.
        return cellArray;
    } // End method.
    
    public static void display(Cell[][] grid) {
        for (int x = 0; x < grid.length; x++) {
            for (int y = 0; y < grid[x].length; y++) {
                int top = 0;
                int right = 0;
                int bottom = 0;
                int left = 0;
                if (grid[x][y].walls[0]) {
                    top = 1;
                }
                if (grid[x][y].walls[1]) {
                    right = 1;
                }
                if (grid[x][y].walls[2]) {
                    bottom = 1;
                }
                if (grid[x][y].walls[3]) {
                    left = 1;
                }
                Border paneEdge = BorderFactory.createMatteBorder(top,left,bottom,right, Color.GREEN);
                grid[x][y].panel.setBorder(paneEdge);
                grid[x][y].panel.setBackground(Color.BLACK);
            }
        }
    }
    
} // End class.
