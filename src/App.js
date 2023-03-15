import { useEffect, useState } from "react";
import Inputs from "./components/Inputs";
import MatrixInput from "./components/Matrix";
import SeatLayout from "./components/seatLayout";
import "./index.scss";

export default function App() {
  // State initialization
  const [seatState, setSeatState] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [seat, setSeat] = useState("seater");
  const [descks, setDescks] = useState("seater");

  // useEffect hook to update hasError state based on input validation
  useEffect(() => {
    const invalid = document?.querySelectorAll(".invalid");
    if (invalid?.length !== 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [hasError]);

  // Functions to update state based on child component input
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

  // Rendering of child components with necessary props
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
        seat={seat}
        descks={descks}
      />
    </div>
  );
}
