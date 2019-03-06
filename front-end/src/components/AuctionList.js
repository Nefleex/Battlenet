import React from "react";
import Auction from "./Auction";
import { connect } from "react-redux";

const AuctionList = ({ auctions }) => {
  const auctionList = auctions.map((item, i) => (
    <Auction key={i} auction={item.name} />
  ));
  return <div>{auctionList}</div>;
};

function mapStateToProps(state) {
  const { auctions, error, loading } = state.Auction;
  return {
    auctions: auctions
  };
}
export default connect(mapStateToProps)(AuctionList);
