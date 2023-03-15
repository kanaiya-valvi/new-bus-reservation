import React, { useEffect, useState } from "react";
import _ from "lodash";

function MatrixInput({
  numRows,
  numCols,
  onSeatChange,
  onError,
  seat,
  descks,
}) {
  const [matrix, setMatrix] = useState([]);

  function isDuplicateValuePresent(matrix, value, currentRow) {
    const flattened = _.flatten(
      _.slice(matrix, 0, currentRow).concat(_.slice(matrix, currentRow + 1))
    );
    return _.some(flattened, (val) => val.seatID === value && value !== "");
  }

  function isDuplicateValueInRow(matrix, value, row, col) {
    const rowValues = matrix[row];

    // Check the target column for the desired value
    if (
      rowValues[col].seatID === value ||
      (rowValues[col].seatID === "" && value === undefined)
    ) {
      return true;
    }

    // Check if the value already exists in the row (excluding immediate neighbors)
    // if seatTyoe is sleeper and seater
    if (seat === "seater/sleeper") {
      for (let i = 0; i < rowValues.length; i++) {
        if (i !== col && i !== col - 1 && i !== col + 1) {
          if (
            rowValues[i].seatID === value ||
            (rowValues[i].seatID === "" && value === undefined)
          ) {
            return true;
          }
        }
      }
    } else {
      // if seat type is sleeper or seter
      for (let i = 0; i < rowValues.length; i++) {
        if (
          rowValues[i].seatID === value ||
          (rowValues[i].seatID === "" && value === undefined)
        ) {
          return true;
        }
      }

      const inputs = document.querySelectorAll("[type='text']");
      const values = [];

      // Store input values in array and check for duplicates
      inputs.forEach((input) => {
        if (input.value !== "") {
          if (values.includes(input.value)) {
            input.classList.add("invalid");
          } else {
            input.classList.remove("invalid");
          }
          values.push(input.value);
        }
      });
    }
    return false;
  }

  useEffect(() => {
    const uniqueIds = () => {
      let result = "";
      const str =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      for (let i = 0; i < 6; i++) {
        result += str.charAt(Math.floor(Math.random() * str.length));
      }
      return result;
    };

    const intialObject = (col, row) => {
      const length = col * row;
      const newArr = [];
      for (let index = 0; index < length; index++) {
        newArr.push({
          id: uniqueIds(),
          seatID: "",
          seatType: seat === "sleeper" ? "sleeper" : "seater",
          seatNumber: index,
        });
      }
      const newdata = _.chunk(newArr, row);
      setMatrix(newdata);
    };
    intialObject(numRows, numCols);
  }, [numRows, numCols, seat]);

  const handleChange = (row, col, e) => {
    // const invalid = document?.querySelectorAll("[type='text']");
    // for (let i = 0; i < invalid.length; i++) {
    //   if (invalid[i].value !== "") {
    //     if (invalid[i].value === e.target.value)
    //       console.log(invalid[i].classList.add("invalid"));
    //     else console.log(invalid[i].classList.remove("invalid"));
    //   }
    // }

    const newMatrix = [...matrix];
    const newValue = e.target.value;

    const isDuplicateCol = isDuplicateValuePresent(matrix, newValue, row);
    const isDuplicateRow = isDuplicateValueInRow(matrix, newValue, row, col);
    let isValid = true;
    onError(false);
    if (newValue !== "") {
      if (isDuplicateCol || isDuplicateRow) {
        isValid = false;
        onError(true);
      }
    }
    // The new value is unique, so update the matrix

    const newseat = { ...newMatrix[row][col], seatID: newValue };

    newMatrix[row][col] = newseat;
    setMatrix(newMatrix);

    // Set the input element's class based on the validation results
    const newArray = _.flatten(matrix);
    e.target.className = isValid ? "" : "invalid";

    onSeatChange(newArray);
  };

  return (
    <div>
      <table>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>
                  <input
                    style={{ width: "40px", height: "40px" }}
                    type="text"
                    maxLength={3}
                    minLength={0}
                    onChange={(e) => handleChange(i, j, e)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MatrixInput;
