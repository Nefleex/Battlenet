import React, { useState } from "react";

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
  return (
    <div className="item-row" key={i}>
      <div id={i} className="item-name">
        {itemName}
      </div>
      <div className="quantity">{quantity}</div>
      <div className="buyout-gold">{total}</div>
      <div className="unit-cost">{unit}</div>
    </div>
  );
};

export default Auction;
