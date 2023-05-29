import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { RootLayoutStyle } from "./rootLayoutStyle";

class RootLayout extends Component {
  render() {
    const classes = RootLayoutStyle();
    return (
      <div className={classes.root}>
        <Outlet />
      </div>
    );
  }
}
export default RootLayout;
