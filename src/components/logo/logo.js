import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import bird_logo from "./bird.png";
import "../../App.css";

const Logo = () => {
  return (
    <div className="center ma4 mt0">
      <Tilt
        className="Tilt"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3 ">
          <img alt="logo" src={bird_logo} style={{ paddingTop: "5px" }}></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
