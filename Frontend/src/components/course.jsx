import React, { useEffect, useState } from "react";
import Cards from "./cards";
import axios from "axios";
import { Link } from "react-router-dom";
function Course() {
  const [book, setBook] = useState([]);
  const backendurl=import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const getBook = async () => {
      try {
const res = await axios.get(backendurl + '/book/course');
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
  
  return (
    <>
      <div className=" max-w-screen-2xl mx-auto md:px-20">
        <div className="mt-17 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
            Whether you're a curious learner, a passionate creator, or someone eager to grow, you've come to the right place. This platform is built to inspire, educate, and support you on your journey. Dive into a world of free courses, expert insights, and hands-on resources designed to help you learn something new every day. Our community is open, inclusive, and always evolving — just like you. So take your time, explore, ask questions, and enjoy the process. We're excited to be a part of your learning adventure. Welcome, and let’s get started!
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;