import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ModelContext from "../context/ModelContext";

const Navbar = () => {
  const { toggleDisplay } = useContext(ModelContext);
  return (
    <div className="flex items-center justify-center w-full h-32">
      <div className="flex items-center justify-around h-20 w-full md:w-[80%] lg:w-[70%] xl:w-[60%] rounded-full shadow-xl shadow-zinc-100">
        <div>
          <img src="/cmwlogo.svg" className="h-12" alt="" />
        </div>
        <div className="flex space-x-12 font-semibold">
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>Find Jobs</Link>
          <Link to={"/"}>Find Talents</Link>
          <Link to={"/"}>About us</Link>
          <Link to={"/"}>Testimonials</Link>
        </div>
        <div>
          <button
            onClick={toggleDisplay}
            className="bg-gradient-to-t from-violet-800 to-violet-600 text-white rounded-full px-4 py-2"
          >
            Create Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
