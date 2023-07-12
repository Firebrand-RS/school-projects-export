export function getMatrixComponentPosiiton(matrix, component) {
  let lineIndex;
  let cellIndex;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === component) {
        lineIndex = i;
        cellIndex = j;
        break;
      }
    }
  }
  return { lineIndex, cellIndex };
}
