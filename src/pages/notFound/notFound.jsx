//TODO stateless component
import React, { Component } from "react";
import { formattedMessage } from "react-intl";
class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //TODO translate
  render() {
    return (
      <div className="col-md-12 col-sm-12 row justify-content-center col-lg-12">
        {/* <img
          alt=""
          className="w-50"
          style={{ height: "50vh" }}
          src={require("../../content/images/elements/404.jpg")}
        />
        <div
          style={{ zIndex: 99 }}
          className="pb-2 justify-content-center  col-lg-12 row "
        >
          <img
            alt=""
            style={{ height: "100%", width: "13%" }}
            src={require("../../content/images/elements/bench.png")}
          />
        </div> */}
        <div className="row justify-content-center col-md-12 col-lg-12 col-sm-12 pb-5">
          <div
            style={{ fontSize: 26, zIndex: 99, fontWeight: "bold" }}
            className=" justify-content-center text-muted col-lg-12 row "
          >
            hiiii !
          </div>
          <div
            style={{ fontSize: 26, zIndex: 99 }}
            className=" justify-content-center text-muted col-lg-12 row "
          >
            Page Was Not Found
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
