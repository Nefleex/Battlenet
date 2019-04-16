import React, { Fragment, useState } from "react";
import Loader from "./Loader";
import Auction from "./Auction";
import "./styles/AuctionTable.css";
import capitalize from "../helpers/capitalize";

const AuctionTable = ({
  displayMode,
  auctions,
  target,
  loading,
  sortActions,
  sortActionsAlphabetically
}) => {
  const [sorting, setSorting] = useState({
    quantity: "ASC",
    buyout: "ASC",
    unitPrice: "ASC",
    itemName: "ASC"
  });

  const toGoldSilverCopper = val => {
    const coppers = val.slice(val.length - 2) + "c";
    const silvers = val.slice(val.length - 4, val.length - 2) + "s";
    const golds = (val / 10000).toFixed(0) + "g";
    return golds + silvers + coppers;
  };

  const handleSorting = key => {
    console.log(key);
    console.log(sorting[key]);
    sortActions(key, sorting[key]);
    sorting[key] === "ASC"
      ? setSorting({ ...sorting, [key]: "DESC" })
      : setSorting({ ...sorting, [key]: "ASC" });
  };
  const handleSortingAlphabetically = key => {
    console.log(key);
    console.log(sorting[key]);
    sortActionsAlphabetically(key, sorting[key]);
    sorting[key] === "ASC"
      ? setSorting({ ...sorting, [key]: "DESC" })
      : setSorting({ ...sorting, [key]: "ASC" });
  };

  const SortIndicator = ({ mode }) => {
    if (mode === "ASC") {
      return <span>&#31;</span>;
    } else {
      return <span>&#30;</span>;
    }
  };

  switch (displayMode) {
    case "Item":
      return (
        <Fragment>
          {loading && <Loader />}
          {auctions && (
            <Fragment>
              <h4>Results for: {target}</h4>
              <div className="column-names">
                <div
                  name="quantity"
                  onClick={e => {
                    handleSorting(e.target.getAttribute("name"));
                  }}
                >
                  Quantity <SortIndicator mode={sorting.quantity} />
                </div>

                <div
                  name="buyout"
                  onClick={e => {
                    handleSorting(e.target.getAttribute("name"));
                  }}
                >
                  Buyout
                  <SortIndicator mode={sorting.buyout} />
                </div>
                <div
                  name="unitPrice"
                  onClick={e => {
                    handleSorting(e.target.getAttribute("name"));
                  }}
                >
                  Unit Cost
                  <SortIndicator mode={sorting.unitPrice} />
                </div>
              </div>
            </Fragment>
          )}
          {auctions &&
            auctions.map((auction, i) => {
              const { quantity, buyout, unitPrice } = auction;
              const total = toGoldSilverCopper(buyout);
              const unit = toGoldSilverCopper(unitPrice);

              return (
                <Fragment key={i}>
                  <div className="item-row" key={i}>
                    <div className="quantity">{quantity}</div>
                    <div className="buyout-gold">{total}</div>
                    <div className="unit-cost">{unit}</div>
                  </div>
                  <hr />
                </Fragment>
              );
            })}
        </Fragment>
      );
    case "Owner":
      return (
        <Fragment>
          {loading && <Loader />}
          {auctions && (
            <Fragment>
              <h4>Results for: {capitalize(target)}</h4>
              <div className="column-names">
                <div
                  name="itemName"
                  onClick={e => {
                    handleSortingAlphabetically(e.target.getAttribute("name"));
                  }}
                >
                  Item Name <SortIndicator mode={sorting.itemName} />
                </div>
                <div
                  name="quantity"
                  onClick={e => {
                    handleSorting(e.target.getAttribute("name"));
                  }}
                >
                  Quantity <SortIndicator mode={sorting.quantity} />
                </div>

                <div
                  name="buyout"
                  onClick={e => {
                    handleSorting(e.target.getAttribute("name"));
                  }}
                >
                  Buyout <SortIndicator mode={sorting.buyout} />
                </div>
                <div
                  name="unitPrice"
                  onClick={e => {
                    handleSorting(e.target.getAttribute("name"));
                  }}
                >
                  Unit Cost <SortIndicator mode={sorting.unitPrice} />
                </div>
              </div>
            </Fragment>
          )}

          {auctions &&
            auctions.map((auction, i) => {
              const {
                quantity,
                buyout,
                unitPrice,
                itemName,
                ...rest
              } = auction;
              const total = toGoldSilverCopper(buyout);
              const unit = toGoldSilverCopper(unitPrice);

              return (
                <Fragment key={i}>
                  {/* <div
                      id={i}
                      className="item-name"
                      onMouseOver={e => {
                        console.log(auction);
                      }}
                      onMouseEnter={() => setTooltip(itemName)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {itemName}
                    </div>
                    <div className="quantity">{quantity}</div>
                    <div className="total">{buyout}</div>
                    <div className="buyout-gold">{total}</div>
                    <div className="unit-cost">{unit}</div> */}
                  <Auction
                    key={i}
                    itemName={itemName}
                    quantity={quantity}
                    buyout={buyout}
                    total={total}
                    unit={unit}
                    rest={rest}
                  />

                  <hr />
                </Fragment>
              );
            })}
        </Fragment>
      );
    default:
      return <div>Oopsie! Something went wrong</div>;
  }
};

export default AuctionTable;
