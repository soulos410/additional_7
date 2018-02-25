module.exports = function solveSudoku(matrix) {
  const getPosition = (puzzle, x, y) => {
    let hash = {};
    for (let u = 0; u < 9; u++) {
       hash[ puzzle[y][u] ] = 1;
       hash[ puzzle[u][x] ] = 1;
       hash[ puzzle[ 3*((y/3)|0) + ((u/3)|0) ][ 3*((x/3)|0) + (u % 3) ] ] = 1;
    }
    let poss = [];
    for (let i = 1; i <= 9; i++) {
      if (!(i in hash)) poss.push(i);
    }
    return poss;
  }
  let indicies = [], n = 0;
  for (n = 0; n < 9*9; n++) {
    matrix[(n/9)|0][n%9] === 0 && indicies.push({ v: n, p: null, i: 0});
  }
  n = 0;
  while (n < indicies.length) {
    let c = indicies[n], y = (c.v/9)|0, x = c.v%9;
    c.p = c.p || getPosition(matrix, x, y);    
    if (c.i >= c.p.length) {
      matrix[y][x] = 0;
      c.i = 0; c.p = null; 
      n--;
    } else {
      matrix[y][x] = c.p[c.i++];
      n++;
    }
  }
  
  return matrix;
}