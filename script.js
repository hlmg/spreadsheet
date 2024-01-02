const spreadSheetContainer = document.querySelector('#spreadsheet-container');
const rows = 10;
const columns = 10;
const spreadsheet = [];
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class Cell {
  constructor(isHeader, disabled, data, row, column, active = false) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.active = active;
  }
}

function initSpreadsheet() {
  for (let i = 0; i < rows; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < columns; j++) {
      let cellData = '';
      let isHeader = false;
      let disabled = false;

      if (j === 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }

      if (i === 0) {
        cellData = alphabet[j - 1];
        isHeader = true;
        disabled = true;
      }

      if (!cellData) {
        cellData = "";
      }

      const cell = new Cell(isHeader, disabled, cellData, i, j, false);
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
  drawSheet();
  console.log(spreadsheet);
}

function createCellEl(cell) {
  const cellEl = document.createElement('input');
  cellEl.className = 'cell';
  cellEl.id = 'cell_' + cell.row + cell.column;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add('header');
  }

  cellEl.onclick = () => handleCellClick(cell);
  return cellEl;
}

function handleCellClick(cell) {
  clearHeaderActiveStates();
  const rowHeader = spreadsheet[cell.row][0];
  const columnHeader = spreadsheet[0][cell.column];
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  rowHeaderEl.classList.add('active');
  columnHeaderEl.classList.add('active');
}

function getElFromRowCol(row, column) {
  return document.querySelector("#cell_" + row + column)
}

function clearHeaderActiveStates() {
  const headers = document.querySelectorAll('.header');

  headers.forEach(header => {
    header.classList.remove('active');
  });
}

function drawSheet() {
  for (let i = 0; i < rows; i++) {
    const rowContainerEl = document.createElement('div');
    rowContainerEl.className = 'cell-row';
    for (let j = 0; j < columns; j++) {
      const cell = spreadsheet[i][j];
      rowContainerEl.append(createCellEl(cell))
    }
    spreadSheetContainer.append(rowContainerEl);
  }
}

initSpreadsheet()
