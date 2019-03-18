import React, { Fragment, useEffect, useState } from "react";

const Auction = ({
  quantity,
  buyout,
  unitPrice,
  itemName,
  total,
  unit,
  i,
  ...rest
}) => {
  const [tooltip, setTooltip] = useState(false);
  const TooltipView = ({ tooltip }) => {
    if (tooltip === true) {
      return (
        <div
          style={{
            left: "5%",
            position: "absolute",
            zIndex: 999,
            height: "90px",
            width: "90px",
            border: "red dotted 1px"
          }}
        >
          Hello
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <div className="item-row" key={i}>
      <div
        id={i}
        className="item-name"
        onMouseEnter={() => {
          setTooltip(true);
        }}
        onMouseLeave={() => {
          setTooltip(false);
        }}
      >
        {itemName}
      </div>
      <div className="quantity">{quantity}</div>
      <div className="buyout-gold">{total}</div>
      <div className="unit-cost">{unit}</div>

      <TooltipView tooltip={tooltip} />
    </div>
  );
};

export default Auction;
