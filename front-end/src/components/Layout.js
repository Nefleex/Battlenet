import React, { useEffect } from "react";
import AuctionList from "./AuctionList";
import { connect } from "react-redux";
import { receiveAuctions } from "../actions/actionCreators";

const Layout = props => {
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(data => data.json())
      .then(data => {
        console.log(data.results);
        props.dispatch(receiveAuctions(data.results));
      })
      .catch(err => console.log(err));
  }, []);

  return <AuctionList auctions={props.auctions} />;
};

function mapStateToProps(state) {
  const { auctions } = state.Auction;
  return {
    state: state
  };
}

export default connect(mapStateToProps)(Layout);
