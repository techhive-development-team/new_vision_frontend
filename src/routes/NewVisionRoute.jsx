import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ContactUs from "../pages/ContactUs";

const NewVisionRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
};

export default NewVisionRoute;
