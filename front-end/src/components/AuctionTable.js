import React, { Fragment } from "react";
import Loader from "./Loader";

const AuctionTable = ({ selected, auctions, target, loading }) => {
  const toGoldSilverCopper = val => {
    const coppers = val.slice(val.length - 2) + "c";
    const silvers = val.slice(val.length - 4, val.length - 2) + "s";
    const golds = (val / 10000).toFixed(0) + "g";
    return golds + silvers + coppers;
  };

  switch (selected) {
    case "Item":
      return (
        <Fragment>
          {loading && <Loader />}
          {auctions && (
            <Fragment>
              <h4>Results for: {target}</h4>
              <div className="column-names">
                <div>Quantity</div>
                <div>Buyout</div>
                <div>Buyout</div>
                <div>Unit Cost</div>
              </div>
              <div className="sort-by">
                <button>Quantity</button>
                <button>Buyout</button>
                <button>Buyout</button>
                <button>Unit Cost</button>
              </div>
            </Fragment>
          )}
          {auctions &&
            auctions.map((auction, i) => {
              const { quantity, buyout, unitPrice } = auction;

              console.log("--");
              console.log(unitPrice);
              console.log(buyout);
              console.log(quantity);
              console.log(buyout / quantity);
              console.log("--");

              // const totalCopper = buyout.slice(buyout.length - 2) + "c";
              // const totalSilver =
              //   buyout.slice(buyout.length - 4, buyout.length - 2) + "s";
              // const totalGold = (buyout / 10000).toFixed(0) + "g";
              // const unitPrice = (buyout / quantity).toString();
              const total = toGoldSilverCopper(buyout);
              const unit = toGoldSilverCopper(unitPrice);

              return (
                <Fragment key={i}>
                  <div className="item-row" key={i}>
                    <div className="quantity">{quantity}</div>
                    <div className="total">{buyout}</div>
                    <div className="buyout-gold">{total}</div>
                    <div className="unit-cost">{unit}</div>
                    <button
                      onClick={() =>
                        console.log(typeof buyout + typeof quantity)
                      }
                    >
                      {" "}
                      print
                    </button>
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
              <h4>Results for: {target}</h4>
              <div className="column-names">
                <div>Quantity</div>
                <div>Buyout</div>
                <div>Buyout</div>
                <div>Unit Cost</div>
              </div>
            </Fragment>
          )}

          {auctions &&
            auctions.map((auction, i) => {
              const { quantity, buyout } = auction;
              // const totalCopper = buyout.slice(buyout.length - 2) + "c";
              // const totalSilver =
              //   buyout.slice(buyout.length - 4, buyout.length - 2) + "s";
              // const totalGold = (buyout / 10000).toFixed(0) + "g";
              const unitPrice = (buyout / quantity).toString();
              const total = toGoldSilverCopper(buyout);
              const unit = toGoldSilverCopper(unitPrice);

              return (
                <Fragment key={i}>
                  <div className="item-row" key={i}>
                    <div className="quantity">{quantity}</div>
                    <div className="total">{buyout}</div>
                    <div className="buyout-gold">{total}</div>
                    <div className="unit-cost">{unit}</div>
                  </div>
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
