import "./App.css";
import MainArchievement from "./components/main/MainArchievement";
import MainContext from "./components/main/MainContext";
import MainCourses from "./components/main/MainCourses";
import MainPartner from "./components/main/MainPartner";
import MainSlider from "./components/main/MainSlider";
import Navbar from "./components/common/Navbar";
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
