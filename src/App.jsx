import "./App.css";
import MainArchievement from "./components/MainArchievement";
import MainContext from "./components/MainContext";
import MainCourses from "./components/MainCourses";
import MainPartner from "./components/MainPartner";
import MainSlider from "./components/MainSlider";
import Navbar from "./components/Navbar";
import Waves from "react-animated-waves";

function App() {
  return (
    <>
      <Navbar />
      <MainSlider />
      <MainContext />
      <MainCourses />
      <MainArchievement />
      <MainPartner />
    </>
  );
}

export default App;
