import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getData, emptyAuctions, sortActions } from "../actions/actionCreators";
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
    getData
  } = props;

  //Render
  return (
    <Fragment>
      <div>This is auctions</div>

      <button onClick={() => console.log(props)}>
        Print redux store of this component
      </button>
      <p>Search by:</p>
      <select
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
      />
      <button onClick={() => search(selected, searchField)}>Search</button>
      <hr />
      {/* <ul>
        {auctions.map((auction, i) => {
          return <li key={i}>{auction.id}</li>;
        })}
      </ul> */}
      <button onClick={() => console.log(auctions)}>Auctions test</button>
      <button onClick={() => console.log(loading)}>Loading</button>
      <hr />
      <Error error={error} />
      <AuctionTable
        selected={selected}
        auctions={auctions}
        target={extra}
        loading={loading}
        displayMode={displayMode}
        sortActions={sortActions}
      />
    </Fragment>
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
  { getData, emptyAuctions, sortActions }
)(AuctionList);
