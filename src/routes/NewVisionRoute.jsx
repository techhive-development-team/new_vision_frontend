import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import Courses from "../pages/courses/Courses";
import Happenings from "../pages/happenings/Happenings";
import HappeningByCategory from "../pages/happenings/HappeningByCategory";
import HappeningDetail from "../pages/happenings/HappeningDetail";
import Quiz from "../pages/Quiz";
import CourseDetail from "../pages/courses/CourseDetail";
import StudentRegistrationForm from "../pages/students/StudentRegistrationForm";
import StudentReviewDetail from "../pages/StudentReviewDetail";
import RegistrationSuccess from "@/pages/students/RegistrationSuccess";
import ScrollToTop from "./ScrollToTop";
import ErrorPage from "@/pages/ErrorPage";
import NotFound from "@/pages/NotFound";
import CourseByType from "@/pages/courses/CourseByType";

const NewVisionRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/happening" element={<Happenings />} />
      <Route path="/happening/category/:id" element={<HappeningByCategory />} />
      <Route path="/happening/:id" element={<HappeningDetail />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/courses/:id/apply" element={<StudentRegistrationForm />} />
      <Route
        path="/courses/:id/apply/success"
        element={<RegistrationSuccess />}
      />
      <Route path="/student-review/:id" element={<StudentReviewDetail />} />
      <Route path="/courses/program/:type" element={<CourseByType />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default NewVisionRoute;
