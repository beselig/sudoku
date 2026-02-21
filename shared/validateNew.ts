import { Puzzle, BoardValidityState, Coordinates } from "./types";

export function getBoardValidityState(state: Puzzle) {
  const invalidFields: Coordinates[] = [];

  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cellValue = state[rowIndex][colIndex];
      if (cellValue === null) {
        invalidFields.push([rowIndex, colIndex]);
        continue;
      }

      const rowIsValid = validateRow(rowIndex, state, cellValue);
      if (!rowIsValid) {
        invalidFields.push([rowIndex, colIndex]);
        continue;
      }

      const colIsValid = validateCol(colIndex, state, cellValue);
      if (!colIsValid) {
        invalidFields.push([rowIndex, colIndex]);
        continue;
      }

      const boxIsValid = validateCellAgainstBox(
        [rowIndex, colIndex],
        state,
        cellValue,
      );
      if (!boxIsValid) {
        invalidFields.push([rowIndex, colIndex]);
        continue;
      }
    }
  }

  return invalidFields;
}

function validateRow(index: number, state: Puzzle, cellValue: number) {
  let matches = 0;
  for (let col = 0; col < 9; col++) {
    if (state[index][col] === cellValue) {
      matches++;
    }
  }

  // console.log(cellValue, matches, "\n ============ ");
  return matches === 1;
}
function validateCol(index: number, state: Puzzle, cellValue: number) {
  let matches = 0;
  for (let row = 0; row < 9; row++) {
    if (state[row][index] === cellValue) {
      matches++;
    }
  }

  return matches === 1;
}

const validateCellAgainstBox = (
  [rowId, colId]: Coordinates,
  state: Puzzle,
  value: number,
) => {
  const [boxRowId, boxColId] = getBoxCoordinates(rowId, colId);

  let rowCursor = boxRowId === 0 ? 0 : boxRowId === 1 ? 3 : 6;
  let colCursor = boxColId === 0 ? 0 : boxColId === 1 ? 3 : 6;

  let valueMatches = 0;

  for (let i = rowCursor; i <= rowCursor + 2; i++) {
    for (let j = colCursor; j <= colCursor + 2; j++) {
      if (state[i][j] === value) {
        valueMatches++;
      }
    }
  }

  return valueMatches === 1;
};

const getBoxCoordinates = (...args: Coordinates) => {
  const [rowId, colId] = args;

  const boxCoords: Coordinates = [0, 0];

  if (rowId < 3) boxCoords[0] = 0;
  else if (rowId < 6) boxCoords[0] = 1;
  else boxCoords[0] = 2;

  if (colId < 3) boxCoords[1] = 0;
  else if (colId < 6) boxCoords[1] = 1;
  else boxCoords[1] = 2;

  return boxCoords;
};
