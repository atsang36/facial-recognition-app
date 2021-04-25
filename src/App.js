import "./App.css";
import React from "react";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/image-link-form/image-link-form";
import Rank from "./components/rank/rank";
import FacialRecognition from "./components/facial-recognition/facial-recognition";
import Particles from "react-particles-js";
import SignIn from "./components/sign-in/sign-in";
import Register from "./components/register/register";

const Clarifai = require("clarifai");
require("dotenv").config();

const CLARIFAI_API_KEY = process.env.REACT_APP_CLARIFAI_API_KEY;

const app = new Clarifai.App({
  apiKey: CLARIFAI_API_KEY,
});

const particlesOptions = {
  partclles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
  polygon: {
    enable: true,
    type: "inside",
    move: {
      radius: 10,
    },
    url: "path/to/svg.svg",
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        email: "",
        name: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (input) => {
    this.setState({
      user: {
        id: input.id,
        email: input.email,
        name: input.name,
        entries: input.entries,
        joined: input.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - [face.right_col * width],
      bottomRow: height - [face.bottom_row * height],
    };
  };

  displayBox = (coordinates) => {
    this.setState({ box: coordinates });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // Testing: https://angus-doc.readthedocs.io/en/latest/_images/aurelien.jpg
  onSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    try {
      const response = await app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      );
      this.displayBox(this.calculateFaceLocation(response));
    } catch (err) {
      console.log(err);
    }
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={{ particlesOptions }} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit}
            />
            <FacialRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
