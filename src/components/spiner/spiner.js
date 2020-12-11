import { Component } from "react";
import Loader from "react-loader-spinner";

export default class Spiner extends Component {
  //other logic
  render() {
    return (
      <Loader
        className="loader"
        type="ThreeDots"
        color="plum"
        secondaryColor="grey"
        height={40}
        width={80}
      />
    );
  }
}
