import React from "react";
import { formatTime } from "../utils/formatTime";
import { FiUserPlus } from "react-icons/fi";
import { RiStackLine, RiBuildingLine } from "react-icons/ri";

const Jobs = ({ jobs }) => {
  return (
    <>
      <div className="flex items-center justify-center bg-slate-50 h-full py-6 w-full">
        <div className="grid grid-cols-4 gap-4 p-4 w-[98%] lg:w-[95%]">
          {jobs
            ?.sort(
              (a, b) => formatTime(b.jobCreatedAt) - formatTime(a.jobCreatedAt)
            )
            ?.map((job) => (
              <div
                className="flex flex-col space-y-2 justify-between bg-white w-full p-4 rounded-md"
                key={job._id}
              >
                <div className="flex w-full justify-between">
                  <div className="shadow-md shadow-zinc-200 rounded-md p-2 w-fit">
                    <img
                      src="cmwlogo.svg"
                      alt=""
                      className="rounded-full h-12"
                    />
                  </div>
                  <span className="py-1 px-2 bg-sky-300 text-sm h-fit rounded-lg">
                    {formatTime(job?.jobCreatedAt)}
                  </span>
                </div>
                <div className="flex flex-col w-full space-y-2 mt-4">
                  <span className="font-semibold pt-2">{job?.jobTitle}</span>
                  <div className="flex w-full justify-between">
                    <div className="flex items-center text-sm space-x-1">
                      <FiUserPlus />
                      <span className="text-sm">1-3 yr Exp</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <RiBuildingLine />
                      <span>{job?.jobType}</span>
                    </div>
                    <div className="flex items-center text-sm space-x-1">
                      <RiStackLine />
                      <span>{job?.salaryRange?.max}LPA</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1 py-3">
                    {job?.jobDescription ? (
                      <li className="text-start">{job?.jobDescription}</li>
                    ) : (
                      <li className="text-start">
                        Filter destinations based on interests and travel
                        style, and create personalized.
                      </li>
                    )}
                  </div>
                </div>
                <button className="w-full bg-sky-500 text-white py-2 rounded-md mt-2">
                  Apply Now
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Jobs;
