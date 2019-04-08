import { combineReducers } from "redux";
import Auction from "./auction";
import User from "./user";
import Register from "./register";
import Dashboard from "./dashboard";

export default combineReducers({ Auction, User, Register, Dashboard });
