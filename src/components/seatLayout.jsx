import _ from "lodash";
import React, { useEffect, useState } from "react";
import imgSeat from "../assets/seat-seater.svg";
import imgSleeper from "../assets/seat-sleeper.png";

const Grid = ({ children, column, row }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${column},minmax(50px,100px))`,
      gridTemplateRows: `repeat(${row}, 50px)`,
      gridGap: "5px",
      // transform: "translate(90deg)",
      maxWidth: "200px",
    }}> 
    {children}
  </div>
);

const Seat = ({ seat }) => (
  <div
    style={{
      gridColumn: seat.seatType === "sleeper" ? `span 2` : `span 1`,
    }}>
    {seat.seatType === "sleeper" ? (
      <img src={imgSleeper} height="50px" width="100px" alt="" />
    ) : (
      <img src={imgSeat} height="50px" width="50px" alt="" />
    )}
  </div>
);

const SeatLayout = ({ seatState, column, row, hasError }) => {
  const [seatBlank, setSeatBlank] = useState([]);
  const [notSeatBlank, setNotSeatBlank] = useState([]);
  const [bus, setBus] = useState(notSeatBlank);

  const [renderSeat, setRenderSeat] = useState([]);

  useEffect(() => {
    setSeatBlank(seatState.filter((seat) => seat.seatID === ""));
    setNotSeatBlank(seatState.filter((seat) => seat.seatID !== ""));

    const filteredBus = bus.filter((item) => item.seatID !== "");

    const uniques = _.uniqBy(filteredBus, "seatID");

    const diff = _.differenceWith(filteredBus, uniques, _.isEqual);

    const diffSeatId = diff.map((i) => i.seatID);

    const final = _.uniqBy(
      filteredBus.map((item) =>
        diffSeatId.includes(item.seatID)
          ? { ...item, seatType: "sleeper" }
          : { ...item }
      ),
      "seatID"
    );
    setBus(seatState);
    const setNewArray = [...seatBlank, ...final];
    const filterArray = setNewArray.sort((a, b) => a.seatNumber - b.seatNumber);
    setRenderSeat(filterArray);
  }, [seatState, bus]);

  if (hasError) {
    return <h1>PLEASE CHECK THE SEAT ID !!</h1>;
  }

  return (
    <>
      <Grid row={row} column={column}>
        {renderSeat.map((seat) =>
          seat.seatID !== "" ? (
            <Seat key={seat.id} seat={seat} />
          ) : (
            <div key={seat.id} ></div>
          )
        )}
      </Grid>
    </>
  );
};

export default SeatLayout;
