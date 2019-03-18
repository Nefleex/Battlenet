import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  getData,
  emptyAuctions,
  sortActions,
  sortActionsAlphabetically
} from "../actions/actionCreators";
import AuctionTable from "./AuctionTable";
import "./styles/Auctions.css";

const AuctionList = props => {
  const [selected, setSelected] = useState("Item");
  const [searchField, setSearchField] = useState("");
  const [displayMode, setDisplayMode] = useState("Item");

  const search = (selected, searchField) => {
    if (searchField !== "") {
      setDisplayMode(selected);
      console.log("Search pressed :" + selected);
      emptyAuctions();
      getData(selected, searchField);
    }
  };
  //Destructuring props
  const {
    auctions: { auctions, extra },
    loadStatus: { error, loading },
    emptyAuctions,
    sortActions,
    sortActionsAlphabetically,
    getData
  } = props;

  //Render
  return (
    <div className="auctions-main">
      <form action="#" className="search-form">
        <label className="search-label" for="select-search-option">
          &#36;earch by:
        </label>
        <select
          id="select-search-option"
          className="select-search-option"
          onChange={e => {
            setSelected(e.target.value);
            console.log(selected);
          }}
        >
          <option name="item" value="Item">
            Item
          </option>
          <option name="owner" value="Owner">
            Owner
          </option>
        </select>
        <input
          type="text"
          className="search-input"
          name="search"
          onChange={e => {
            setSearchField(e.target.value);
          }}
          onKeyPress={e => {
            if ((e.keyCode || e.charCode || e.which) === 13) {
              e.preventDefault();
              search(selected, searchField);
            }
          }}
        />
        <button
          className="search-button"
          type="button"
          onClick={() => search(selected, searchField)}
        >
          Search
        </button>
      </form>

      <hr />
      <Error error={error} />
      <AuctionTable
        selected={selected}
        auctions={auctions}
        target={extra}
        loading={loading}
        displayMode={displayMode}
        sortActions={sortActions}
        sortActionsAlphabetically={sortActionsAlphabetically}
      />
    </div>
  );
};

const Error = ({ error }) => {
  return error ? <div style={{ color: "red" }}>{error}</div> : null;
};

function mapStateToProps(state) {
  // const { auctions, error, loading } = state.Auction;
  return {
    auctions: state.Auction,
    loadStatus: state.Loading
  };
}
export default connect(
  mapStateToProps,
  { getData, emptyAuctions, sortActions, sortActionsAlphabetically }
)(AuctionList);
