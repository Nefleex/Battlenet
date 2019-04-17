import React, { Fragment, useState } from "react";
import Loader from "./Loader";
import Auction from "./Auction";
import "./styles/AuctionTable.css";
import capitalize from "../helpers/capitalize";

const AuctionGrid = ({ auctions }) => {
  const [sorting, setSorting] = useState({
    quantity: "ASC",
    buyout: "ASC",
    unitPrice: "ASC",
    itemName: "ASC"
  });
  const [thisAuctions, setThisAuctions] = useState(auctions);

  const toGoldSilverCopper = val => {
    const coppers = val.slice(val.length - 2) + "c";
    const silvers = val.slice(val.length - 4, val.length - 2) + "s";
    const golds = (val / 10000).toFixed(0) + "g";
    return golds + silvers + coppers;
  };

  const sortAuctions = (key, mode, arr) => {
    const sortByKey = (key, mode) => (a, b) => {
      if (mode === "ASC") {
        if (parseInt(a[key]) < parseInt(b[key])) {
          return 1;
        } else if (parseInt(a[key]) > parseInt(b[key])) {
          return -1;
        }
      } else if (mode === "DESC") {
        if (parseInt(a[key]) > parseInt(b[key])) {
          return 1;
        } else if (parseInt(a[key]) < parseInt(b[key])) {
          return -1;
        }
      }
    };
    const sorted = arr.slice().sort(sortByKey(key, mode));
    setThisAuctions(sorted);
    console.log(thisAuctions);
  };
  const sortAlphabetically = (key, mode, arr) => {
    const sortByKeyAlphabetic = (key, mode) => (a, b) => {
      if (mode === "ASC") {
        if (a[key] < b[key]) {
          return 1;
        } else if (a[key] > b[key]) {
          return -1;
        }
      } else if (mode === "DESC") {
        if (a[key] > b[key]) {
          return 1;
        } else if (a[key] < b[key]) {
          return -1;
        }
      }
    };
    const sortedA = arr.slice().sort(sortByKeyAlphabetic(key, mode));
    setThisAuctions(sortedA);
  };

  const handleSorting = key => {
    sortAuctions(key, sorting[key], thisAuctions);
    sorting[key] === "ASC"
      ? setSorting({ ...sorting, [key]: "DESC" })
      : setSorting({ ...sorting, [key]: "ASC" });
  };

  const handleSortingAlphabetically = key => {
    sortAlphabetically(key, sorting[key], thisAuctions);
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

  return (
    <Fragment>
      {thisAuctions && (
        <Fragment>
          <div className="column-names">
            <div
              name="itemName"
              onClick={e => {
                handleSortingAlphabetically(e.target.getAttribute("name"));
              }}
            >
              Item <SortIndicator mode={sorting.itemName} />
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
      {thisAuctions &&
        thisAuctions.map((auction, i) => {
          const { quantity, itemName, buyout, unitPrice } = auction;
          const total = toGoldSilverCopper(buyout);
          const unit = toGoldSilverCopper(unitPrice);

          return (
            <Fragment key={i}>
              <div className="item-row" key={i}>
                <div className="name">{itemName}</div>
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
};

export default AuctionGrid;
