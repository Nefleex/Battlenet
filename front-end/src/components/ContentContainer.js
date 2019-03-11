import React, { useEffect } from "react";
import Header from "./Header";
import React, { Component } from "react";

export default class ContentContainer extends Component {
  render(props) {
    return <div>{props.children}</div>;
  }
}
