import React from "react";
import "./styles/Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <h4 className="home-page-title">Well, hello there!</h4>
      <p>You have stumbled upon my personal project. </p>
      <h4>Purpose:</h4>
      <p>
        This web application was made for my personal use to track the Auction
        House feature in the game World of Warcraft.
      </p>
      <h4>Features:</h4>
      <p>
        Split in two: Unauthenticated usage (not logged in) and authenticated
        usage. If you'd like to gain access to the authenticated features, you
        may create an account at "sing up" on the top right.
      </p>
      <br />
      <ul>
        <b>While authenticated</b>
        <li>
          Add, remove players to track, either by a name or by filtering a list
          of players who currently have auctions posted and select from those.
        </li>
        <li>Inspect auctions of your tracked players.</li>
        <li>
          Select a player from your tracked players by clicking the name to
          display it's auctions below.
        </li>
        <li>
          Auctions are sortable by clicking the name of the column you wish to
          sort (Item name, quantity, buyout, etc).
        </li>
      </ul>
      <ul>
        <br />
        <b>Unauth </b>{" "}
        <li>
          You can create an account at "sign up" in order to log in and gain
          access to authenticated features.
        </li>
        <li>
          Auctions feature:{" "}
          <ul>
            <li>
              Select from a drop down what you wish to search for(auction owners
              or items).
            </li>
            <li>
              Enter into the text field which auction owner or item you wish to
              search for.
            </li>
            <li>
              Sort your search results in ascending or descending order by
              clicking on the column name.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Home;
