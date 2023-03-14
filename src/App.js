import { useState } from "react";
import Inputs from "./components/Inputs";
import MatrixInput from "./components/Matrix";
import SeatLayout from "./components/seatLayout";
import "./index.scss";

export default function App() {
  const [seatState, setSeatState] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [seat, setSeat] = useState("seater");
  const [descks, setDescks] = useState("seater");
  const onSeatChange = (newSeatState) => {
    setSeatState(newSeatState);
  };
  const onError = (errorState) => {
    setHasError(errorState);
  };
  const getNumberOfColumn = (col) => {
    setColumn(col);
  };
  const getNumberOfRow = (row) => {
    setRow(row);
  };
  const seatType = (seat) => {
    setSeat(seat);
  };
  const numberOfdesck = (desck) => {
    setDescks(desck);
  };
  return (
    <div className="App">
      <Inputs
        getNumberOfColumn={getNumberOfColumn}
        getNumberOfRow={getNumberOfRow}
        seatType={seatType}
        numberOfdesck={numberOfdesck}
      />
      <hr />
      <MatrixInput
        onSeatChange={onSeatChange}
        onError={onError}
        numRows={row}
        numCols={column}
        seat={seat}
        descks={descks}
      />
      <SeatLayout
        seatState={seatState}
        hasError={hasError}
        row={row}
        column={column}
      />
    </div>
  );
}
