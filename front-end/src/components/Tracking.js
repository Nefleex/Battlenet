import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getTracking } from "../actions/userActionCreators";
import generateId from "../helpers/generateId";

// Only render this component through UserHOC for user validation
// UserHOC to check expiration of token ----------------
const Tracking = ({ user, getTracking, tracking, ownersUrl, ...props }) => {
  if (!user) return <Redirect to="/" />;
  else if (user) {
    const getNames = async () => {
      try {
        let result = await fetch(ownersUrl);
        result = await result.json();
        setOwners(result);
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
      getTracking();
      getNames();
    }, []);

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const [owners, setOwners] = useState([]);

    const filterSearch = val => {
      val = val.toLowerCase();
      const tempArr = owners.filter(x => {
        return x.owner.toLowerCase().includes(val);
      });
      return tempArr;
    };
    // MAKE CASE INSENSITIVE
    const onChangeHandler = e => {
      setSearch(e.target.value);
      setSearchResults(filterSearch(e.target.value));
    };
    const clearSearch = () => {
      setSearch("");
      setSearchResults("");
    };
    return (
      <div>
        <button onClick={() => console.log(tracking)}>props</button>
        <hr />
        <form action="#">
          <label htmlFor="name-to-add-input">Search for player to add:</label>
          <input
            type="text"
            id="name-to-add-input"
            onChange={e => onChangeHandler(e)}
            value={search}
          />
          <button
            type="button"
            onClick={() => {
              console.log(owners);
            }}
          >
            Add
          </button>
          <br />
          {JSON.stringify(searchResults)}
        </form>
        {tracking &&
          tracking.map(el => {
            return <TrackingItem track={el} />;
          })}
      </div>
    );
  }
};

const TrackingItem = ({ track }) => {
  const [toggled, setToggled] = useState(false);
  return (
    <div key={generateId(track.owner)}>
      {track.owner}:{track.auctions.length}
      <button onClick={() => setToggled(!toggled)}>toggle</button>
      {toggled && track.auctions.map(a => <Auction auction={a} />)}
    </div>
  );
};

const Auction = ({ auction }) => (
  <Fragment>
    <hr />
    {auction.itemName}
  </Fragment>
);

const mapStateToProps = state => {
  return {
    user: state.User.user,
    tracking: state.User.tracking
  };
};

export default connect(
  mapStateToProps,
  { getTracking }
)(Tracking);
