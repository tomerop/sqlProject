import { Route, Routes } from "react-router-dom";
import AllCourses from "./allCourses";
import Login from "./login";

import SignUp from "./signup";
import Navbar from "./navbar";
import Card from "./myCourseCard";
import MyCourses from "./myCourses";

const Main = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllCourses />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="profile" element={<MyCourses />} />
      </Routes>
    </>
  );
};

export default Main;
