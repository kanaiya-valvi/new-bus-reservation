import React, { useState } from "react";

const Inputs = ({
  getNumberOfColumn,
  getNumberOfRow,
  seatType,
  numberOfdesck,
}) => {
  const [column, setColumnValue] = useState(0);
  const [row, setRowValue] = useState(0);
  const numberOfColumn = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 16) {
      getNumberOfColumn(value);
      setColumnValue(value);
    }
  };
  const numberOfRow = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 8) {
      getNumberOfRow(value);
      setRowValue(value);
    }
  };
  return (
    <div>
      <label>decks</label>
      <select
        name=""
        id=""
        onChange={(e) => {
          numberOfdesck(e.target.value);
        }}>
        <option value="single">single</option>
        <option value="double">double</option>
      </select>
      <label>bus type</label>
      <select
        name=""
        id=""
        onChange={(e) => {
          seatType(e.target.value);
        }}>
        <option value="seater">seater</option>
        <option value="sleeper">sleeper</option>
        <option value="seater/sleeper">seater/sleeper</option>
      </select>
      <label>Column</label>
      <input
        className="columnInput"
        type="number"
        min={0}
        max={16}
        value={column}
        onChange={numberOfColumn}
      />
      <label>Rows</label>
      <input
        className="rowInput"
        type="number"
        min={0}
        max={8}
        value={row}
        onChange={numberOfRow}
      />
    </div>
  );
};
export default Inputs;
