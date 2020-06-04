/* Reading examples */

/*********************************
 * Conway's Game of Life
 * 
 * Rules:
 *      Any live cell with fewer than 2 or more neighbors dies
 *      Any live cell with 2 or three neighbors lives on to the next generation
 *      Any dead cell with exactly 3 neighbors becomes a live cell
 * 
 * Changes happen to the entire grid at once, not cell by cell
 * 
 * 
**********************************/

const Width = 30;
const Height = 15;
const Grid = document.querySelector("#grid");


function buildGrid(){
    let newGrid = new Matrix(Width, Height, cellElement);
}




class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
      this.width = width;
      this.height = height;
      this.content = [];
  
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          this.content[y * width + x] = element(x, y);
        }
      }
    }
  
    get(x, y) {
      return this.content[y * this.width + x];
    }
    set(x, y, value) {
      this.content[y * this.width + x] = value;
    }
  }

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return {done: true};

    let value = {x: this.x,
                 y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }
}



