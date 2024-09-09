import React from "react";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { LuUser } from "react-icons/lu";

const Filteration = ({ filters, onInputChange, onSalaryChange }) => {
  return (
    <>
      <div className="flex w-full mt-6 justify-center shadow-md shadow-zinc-100 p-4">
        <div className="flex w-[90%] justify-between">
          <div className="flex items-center justify-center space-x-4 border-r-2 px-4 border-zinc-200 w-full">
            <CiSearch size={20} />
            <input
              type="text"
              name="title"
              value={filters.title}
              onChange={onInputChange}
              className="placeholder:text-zinc-500 font-medium py-2 px-4 outline-none"
              placeholder="Search By Job Title, Role"
            />
          </div>
          <div className="flex items-center justify-center space-x-4 border-r-2 px-4 border-zinc-200 w-full">
            <CiLocationOn size={20} />
            <select
              name="location"
              value={filters.location}
              onChange={onInputChange}
              className="placeholder:text-zinc-500 font-medium py-2 px-4 outline-none"
            >
              <option value="" disabled className="text-gray-400">
                Preferred Location
              </option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Delhi">Delhi</option>
              <option value="Gurugram">Gurugram</option>
              <option value="Pune">Pune</option>
            </select>
          </div>
          <div className="flex items-center justify-center space-x-4 border-r-2 px-4 border-zinc-200 w-full">
            <LuUser size={20} className="text-zinc-600" />
            <select
              name="jobType"
              value={filters.jobType}
              onChange={onInputChange}
              className="px-2 py-2 font-medium w-full outline-none"
            >
              <option value="" disabled className="text-gray-400">
                Job Type
              </option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
              <option value="Partime">Partime</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="flex flex-col items-center justify-center space-x-4 py-2 px-4 w-full">
            <div className="w-full flex justify-between">
              <span className="font-medium">Salary Per Month</span>
              <span className="font-medium">{filters.salary}k</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={filters.salary}
              onChange={onSalaryChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filteration;
