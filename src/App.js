import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/image-link-form/image-link-form";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm />
      {/* <FacialRecognition /> */}
    </div>
  );
}

export default App;
