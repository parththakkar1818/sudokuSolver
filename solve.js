function solveSudoku() {
  var elements = document.getElementsByClassName("cell");
  var board = [],
    tempRaw = [];
  var falseCount = 0;
  for (var i = 0; i < elements.length; i++) {
    var item = elements[i].value;
    if (!((item >= "1" && item <= "9") || item === "")) falseCount++;

    tempRaw.push(item);
    if ((i + 1) % 9 == 0) {
      board.push(tempRaw);
      tempRaw = [];
    }
  }


  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (!board[i][j]) board[i][j] = ".";
    }
  }

  if (falseCount) {
    alert("Enter Valid Input");
  }else if (prevIsValid(board) !== "ok") {
    alert("Getting Two or more values in " + prevIsValid(board));
  }else {
    solve(board);
    for (var i = 0; i < elements.length; i++) {
      elements[i].value = board[Math.floor(i / 9)][i % 9];
    }
  }
}

function solve(board) {
  
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == ".") {
        for (var k = "1"; k <= "9"; k++) {
          if (isValid(board, i, j, k)) {
            board[i][j] = k;
            if (solve(board)) return true;
            else board[i][j] = ".";
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValid(board, i, j, k) {
  for (var it = 0; it < 9; it++) {
    if (board[i][it] == k) return false;
    if (board[it][j] == k) return false;
    if(board[3* Math.floor(i/3)+Math.floor(it/3)][3*Math.floor(j/3)+it%3]==k) return false;
  }
  return true;
}

function resetSudoku() {
  var elements = document.getElementsByClassName("cell");
  for (var i = 0; i < elements.length; i++) {
    elements[i].value = "";
  }
}

function prevIsValid(board) {
  for (var i = 0; i < 9; i++) {
    var rowCount = {};
    var colCount = {};
    var subMatrixCount = {};

    for (var j = 0; j < 9; j++) {
      var rowValue = board[i][j];
      var colValue = board[j][i];
      var subMatrixValue =
        board[Math.floor(i / 3) * 3 + Math.floor(j / 3)][(i % 3) * 3 + (j % 3)];

      if (rowValue !== ".") {
        if (rowCount[rowValue]) {
          return "row";
        }
        rowCount[rowValue] = true;
      }

      if (colValue !== ".") {
        if (colCount[colValue]) {
          return "column";
        }
        colCount[colValue] = true;
      }

      if (subMatrixValue !== ".") {
        if (subMatrixCount[subMatrixValue]) {
          return "submatrix";
        }
        subMatrixCount[subMatrixValue] = true;
      }
    }
  }
  return "ok";
}
