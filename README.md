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
Your run-of-the-mill express server. Routes for user(account management),auth(authentication) and auctions(serving http requests from the front end UI). Authentication is done with jsonwebtoken package. Since this application requires no sensitive information, there is no implementation of revoking tokens. Once user has been logged in, issued token can be used to access resources that require authentication for **24 hours**. 

#### UI "front-end":
Create-react-app application with react-router v4, redux, react-redux and redux-thunk.
