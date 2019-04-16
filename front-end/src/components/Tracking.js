import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  getTracking,
  postTracking,
  deleteTracking
} from "../actions/userActionCreators";
import generateId from "../helpers/generateId";
import capitalize from "../helpers/capitalize";
import "./styles/Tracking.css";

// Only render this component through UserHOC for user validation
// UserHOC to check expiration of token ----------------
const Tracking = ({
  user,
  getTracking,
  postTracking,
  tracking,
  ownersUrl,
  trackUrl,
  deleteTracking,
  ...props
}) => {
  // If not logged in, redirect
  if (!user) return <Redirect to="/" />;
  else if (user) {
    const getNames = async () => {
      try {
        let result = await fetch(ownersUrl);
        result = await result.json();
        setOwners(result);
        setOgOwners(result);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      getTracking();
      getNames();
    }, []);

    const [nameField, setNameField] = useState("");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const [ogOwners, setOgOwners] = useState([]);
    const [owners, setOwners] = useState([]);
    const [toAdd, setToAdd] = useState([]);
    const [untouched, setUntouched] = useState(true);

    // Remove owners that are also in tracking so that user cannot add to tracking same owners twice
    const removeDuplicates = () => {
      let uniques = [...owners];
      tracking.forEach(t => {
        for (let i = 0; i < uniques.length; i++) {
          if (uniques[i].owner.toLowerCase() === t.owner.toLowerCase()) {
            const removed = uniques.splice(i, 1);
          }
        }
      });
      setOwners(uniques);
    };

    const filterSearch = val => {
      val = val.toLowerCase();
      const arr = owners.filter(x => {
        return x.owner.toLowerCase().includes(val);
      });
      return arr;
    };

    const handleSearchChange = e => {
      setSearch(e.target.value);
      setSearchResults(filterSearch(e.target.value));
    };

    const clearSearch = () => {
      setSearch("");
      setSearchResults("");
    };
    const handleFocus = () => {
      if (untouched) {
        setUntouched(false);
        removeDuplicates();
      }
    };

    const handleAddItem = owner => {
      const newArr = [...owners];
      const newSearchResults = [...searchResults];
      const oIdx = newArr.findIndex(x => x.owner === owner);
      const sIdx = newSearchResults.findIndex(x => x.owner === owner);
      newArr.splice(oIdx, 1);
      newSearchResults.splice(sIdx, 1);
      setOwners(newArr);
      setSearchResults([...newSearchResults]);
      setToAdd([...toAdd, { owner }]);
    };
    const revertItem = owner => {
      console.log(owner);
      console.log(toAdd);
      // Sort alphabetically by values
      setOwners(
        [...owners, owner].sort((a, b) => {
          if (a.owner < b.owner) return -1;
          else if (a.owner > b.owner) return 1;
        })
      );
      const filtered = toAdd.filter(x => x.owner !== owner);

      console.log(filtered);
      setToAdd(filtered);
    };
    const clearAll = toAdd => {
      setSearch("");
      setSearchResults("");
      console.log(toAdd.length);
      if (toAdd.length > 0) {
        const returningOwners = toAdd.filter(
          o => (o.source !== "custom" ? o : null) // Filter out all whose source is custom
        );

        setOwners(
          [...owners, ...returningOwners].sort((a, b) => {
            if (a.owner < b.owner) return -1;
            else if (a.owner > b.owner) return 1;
          })
        );
        setToAdd([]);
      }
    };

    const handleTrackDelete = async owner => {
      const remainingOwners = await deleteTracking(trackUrl, owner);
      console.log(remainingOwners);
      setOwners(remainingOwners);
      setOgOwners(remainingOwners);
      setUntouched(true); // set field status to untouched so duplicates get removed on next focus
    };

    return (
      <div>
        <hr />
        <button onClick={() => console.log(ogOwners)}>log ogOwners</button>
        <button onClick={() => console.log(owners)}>log owners </button>
        <button onClick={() => console.log(toAdd)}>log toAdd </button>

        <section className="tracking-main">
          <form
            action="#"
            className="tracking-form"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <label htmlFor="name-to-add-input">
              Enter player you wish to track
            </label>
            <input
              type="text"
              id="name-to-add-input"
              value={nameField}
              onChange={e => setNameField(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                const name = capitalize(nameField);
                setToAdd([...toAdd, { owner: name, source: "custom" }]);
              }}
            >
              Add
            </button>

            <label htmlFor="filter-to-add-input">
              Search from existing owners:
            </label>
            <input
              type="text"
              id="filter-to-add-input"
              onChange={e => handleSearchChange(e)}
              onFocus={() => handleFocus()}
              onBlur={() => {
                if (!search) {
                  setSearchResults("");
                }
              }}
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
            {searchResults &&
              searchResults.map(o => {
                return <Player owner={o} handleAddItem={handleAddItem} />;
              })}
          </form>
          <div className="list-to-add">
            list to add
            <AddList
              toAdd={toAdd}
              clearAll={clearAll}
              revertItem={revertItem}
              deleteTracking={deleteTracking}
            />
            <button
              onClick={() => {
                postTracking(trackUrl, toAdd);
                setToAdd([]);
                setSearch("");
                setSearchResults([]);
              }}
            >
              ADD TO TRACKING HERE
            </button>
          </div>
        </section>
        <br />
        <TrackingList
          tracking={tracking}
          deleteUrl={trackUrl}
          handleTrackDelete={handleTrackDelete}
          setOwners={setOwners}
        />
      </div>
    );
  }
};
const TrackingList = ({
  tracking,
  deleteUrl,
  handleTrackDelete,
  setOwners
}) => {
  if (!tracking) {
    return <div>You have no tracked players, try adding some.</div>;
  } else {
    return (
      <Fragment>
        <p>Tracked Players:</p>
        {tracking &&
          tracking.map(el => (
            <TrackingItem
              track={el}
              handleTrackDelete={handleTrackDelete}
              url={deleteUrl}
              setOwners={setOwners}
            />
          ))}
      </Fragment>
    );
  }
};
const TrackingItem = ({ track, handleTrackDelete }) => {
  const [toggled, setToggled] = useState(false);
  return (
    <div key={generateId(track.owner)}>
      {capitalize(track.owner)}: {track.auctions.length} auctions
      <button onClick={() => setToggled(!toggled)}>toggle</button>
      <button
        onClick={() => {
          handleTrackDelete(track.owner);
        }}
      >
        delete
      </button>
      {toggled && track.auctions.map(a => <Auction auction={a} />)}
    </div>
  );
};

const Auction = ({ auction }) => (
  <Fragment key={generateId(auction.itemName)}>
    <hr />
    {auction.itemName}
  </Fragment>
);

const Player = ({ owner, handleAddItem }) => {
  return (
    <Fragment key={generateId(owner.owner)}>
      {owner.owner}
      <button onClick={() => handleAddItem(owner.owner)}>+</button>
      <br />
    </Fragment>
  );
};
const ListButtons = ({ toAdd, clearAll, postTracking }) => {
  if (toAdd.length > 0) {
    return (
      <Fragment>
        <button onClick={() => clearAll(toAdd)}>clear</button>
        <button onClick={() => postTracking}>Add to Tracking</button>
      </Fragment>
    );
  } else return null;
};
const AddList = ({ toAdd, clearAll, revertItem, postTracking }) => {
  return (
    <Fragment>
      {toAdd &&
        toAdd.map(a => (
          <ListItem
            key={generateId(a.owner)}
            owner={a}
            revertItem={revertItem}
          />
        ))}
      <ListButtons
        toAdd={toAdd}
        clearAll={clearAll}
        postTracking={postTracking}
      />
    </Fragment>
  );
};

const ListItem = ({ owner, revertItem }) => (
  <div>
    <button
      onClick={() => {
        revertItem(owner);
        console.log(owner);
      }}
    >
      -
    </button>
    {owner.owner}
  </div>
);

const mapStateToProps = state => {
  return {
    user: state.User.user,
    tracking: state.User.tracking
  };
};

export default connect(
  mapStateToProps,
  { getTracking, postTracking, deleteTracking }
)(Tracking);
