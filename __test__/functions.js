function notInRow(arr, row) {
  let st = new Set();

  for (let i = 0; i < 9; i++) {
    if (st.has(arr[row][i])) return false;

    if (arr[row][i] != 0) st.add(arr[row][i]);
  }
  return true;
}

function notInCol(arr, col) {
  let st = new Set();

  for (let i = 0; i < 9; i++) {
    if (st.has(arr[i][col])) return false;

    if (arr[i][col] != 0) st.add(arr[i][col]);
  }
  return true;
}

function notInBox(arr, startRow, startCol) {
  let st = new Set();

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let curr = arr[row + startRow][col + startCol];

      if (st.has(curr)) return false;

      if (curr != 0) st.add(curr);
    }
  }
  return true;
}

function isValid(arr, row, col) {
  return (
    notInRow(arr, row) &&
    notInCol(arr, col) &&
    notInBox(arr, row - (row % 3), col - (col % 3))
  );
}

function isValidConfig(arr, n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!isValid(arr, i, j)) return false;
    }
  }
  return true;
}

const boardIsValid = (board) => {
  let arr = [];
  let k = 0;
  for (let i = 0; i < 9; i++) {
    arr[i] = [];
    for (let j = 0; j < 9; j++) {
      arr[i][j] = board[k++];
    }
  }

  return isValidConfig(arr, 9);
};

const functions = {
  boardIsValid:  (puzzle_string) => {
    let isValid = false;

    isValid =  boardIsValid(puzzle_string);

    return isValid;
  },
};


module.exports = functions;
