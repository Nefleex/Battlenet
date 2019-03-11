import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getData, emptyAuctions, loading } from "../actions/actionCreators";

const AuctionList = props => {
  const [selected, setSelected] = useState("Item");
  const [searchField, setSearchField] = useState("");

  const search = (selected, searchField) => {
    console.log("Search pressed :" + selected);
    if (selected === "Item") {
      emptyAuctions();
      loading();
      getData(selected, searchField);
    } else if (selected === "Owner") {
      emptyAuctions();
      loading();
      getData(selected, searchField);
    }
  };
  //Destructuring props
  const {
    auctions: { auctions, extra },
    loadStatus: { error },
    emptyAuctions,
    loading,
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
      <button onClick={() => console.log(error)}>Error</button>
      <hr />
      <Error error={error} />
      <Table selected={selected} auctions={auctions} searchMode={extra} />
    </Fragment>
  );
};

const Table = ({ selected, auctions, searchMode }) => {
  switch (selected) {
    case "Item":
      return (
        <Fragment>
          <div>Item selected</div>
          <button onClick={() => console.log(auctions + searchMode)}>
            Table Props
          </button>
          {auctions && (
            <div className="column-names">
              <div>Quantity</div>
              <div>Buyout</div>
            </div>
          )}
          {auctions &&
            auctions.map((auction, i) => {
              return (
                <Fragment key={i}>
                  <div
                    className="item-row"
                    key={i}
                    styles={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)"
                    }}
                  >
                    <div className="quantity" styles={{}}>
                      {auction.quantity}
                    </div>
                    <div className="buyout" styles={{}}>
                      {auction.buyout}
                    </div>
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
          <div>Owner selected</div>
          <button onClick={() => console.log(selected)}>Table Props</button>
        </Fragment>
      );
    default:
      return <div>Oopsie! Something went wrong</div>;
  }
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
  { getData, emptyAuctions, loading }
)(AuctionList);
