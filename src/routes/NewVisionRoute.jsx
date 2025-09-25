import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import Courses from "../pages/Courses";
import Happenings from "../pages/happenings/Happenings";
import HappeningByCategory from "../pages/happenings/HappeningByCategory";
import HappeningDetail from "../pages/happenings/HappeningDetail";
import Quiz from "../pages/Quiz";
import CourseDetail from "../pages/CourseDetail";
import StudentRegistrationForm from "../pages/students/StudentRegistratonForm";

const NewVisionRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/happening" element={<Happenings />} />
      <Route path="/happening/category" element={<HappeningByCategory />} />
      <Route path="/happening/:id" element={<HappeningDetail />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/courses/:id/apply" element={<StudentRegistrationForm />} />
    </Routes>
  );
};

export default NewVisionRoute;
