import React from "react";
import Navbar from "../components/Navbar";
import Course from "../components/course";
import Footer from "../components/footer";
function Courses() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Course />
      </div>
      <Footer />
    </>
  );
}

export default Courses;