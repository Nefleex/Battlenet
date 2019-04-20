# Battlenet
Repo for working with Blizzard's Battle.net APIs

**Currently not deployed, only for local use.**

If you wish to use this, you need mysql server and node + npm installed. Look at /auctions/config/config.json to setup your mysql permissions, run npm install at root.

### What does it do?
This program has two parts: 
#### Server "auctions":
Node.js application that periodically checks Blizzard Battle.net API auction dump if it has been updated and compares it to the database
(It is usually updated every 70-120minutes.)

##### Database:
Mysql with sequelize.js ORM.
##### Server:
Your run-of-the-mill express server. Routes for user(account management),auth(authentication) and auctions(serving http requests from the front end UI)

#### UI "front-end":
Create-react-app application with react-router v4, redux, react-redux and redux-thunk.
