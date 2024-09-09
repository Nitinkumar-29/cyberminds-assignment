import React, { useContext, useEffect, useRef } from "react";
import JobContext from "../context/JobContext"; // Import your JobContext
import ModelContext from "../context/ModelContext";
import Location from "./Location";
import { PiArrowsDownUpThin, PiCaretDoubleDown } from "react-icons/pi";
import { FaAngleDoubleRight } from "react-icons/fa";

const CreateJob = () => {
  const { jobData, setJobData, handleCreateJob } = useContext(JobContext);
  const { modelDisplay, toggleDisplay } = useContext(ModelContext);
  const token = localStorage.getItem("token");
  const modelRef = useRef(null);

  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "min" || name === "max") {
      setJobData({
        ...jobData,
        salaryRange: {
          ...jobData.salaryRange,
          [name]: value,
        },
      });
    } else {
      setJobData({
        ...jobData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      handleCreateJob(); // Call the function from the context to create the job
    } else {
      alert("Please login to continue");
    }
  };

  // Handle select change
  const handleJobTypeChange = (e) => {
    const selectedJobType = e.target.value;
    setJobData({
      ...jobData,
      jobType: selectedJobType, // Update Location in jobData
    });
  };

  // useEffect to close the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If modalRef exists and click is outside of the modal
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        toggleDisplay(); // Close the modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDisplay]);

  return (
    <>
      {/* Modal */}
      {modelDisplay === "flex" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleDisplay} // Close when clicking outside the modal
        >
          <div
            ref={modelRef}
            className="bg-white p-6 rounded-md w-[60%] border-2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <button
              onClick={toggleDisplay}
              className="absolute top-2 right-2 text-lg font-bold"
            >
              &times;
            </button> */}
            <h1 className="text-center font-semibold">Create Job Opening</h1>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4 mt-10 w-3/4 mx-auto"
            >
              <div className="flex flex-col space-y-1 items-start w-full">
                <label htmlFor="jobTitle" className="font-medium">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={jobData.jobTitle}
                  onChange={handleOnChange}
                  required
                  className="px-4 py-2 font-medium border-[1px] w-full border-zinc-300 outline-none focus:border-black rounded-md placeholder:font-normal"
                  placeholder="Job title"
                />
              </div>
              <div className="flex flex-col space-y-1 items-start w-full">
                <label htmlFor="companyName" className="font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={jobData.companyName}
                  onChange={handleOnChange}
                  required
                  className="px-4 py-2 font-medium border-[1px] w-full border-zinc-300 outline-none focus:border-black rounded-md placeholder:font-normal"
                  placeholder="Amazon, Microsoft, Swiggy"
                />
              </div>
              <Location />
              <div className="flex flex-col space-y-1 items-start w-full">
                <label htmlFor="jobType" className="font-medium">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={jobData.jobType}
                  onChange={handleJobTypeChange}
                  required
                  className={`px-2 py-2 font-medium border-[1px] w-full border-zinc-300 outline-none focus:border-black rounded-md ${
                    jobData?.jobType === "" ? "text-zinc-500" : "text-black"
                  }`}
                >
                  <option value="" disabled className="text-gray-400">
                    Job Type
                  </option>
                  <option className="text-black" value="Internship">Internship</option>
                  <option className="text-black" value="Full Time">Full Time</option>
                  <option className="text-black" value="Partime">Partime</option>
                  <option className="text-black" value="Contract">Contract</option>
                </select>
              </div>
              <div className="flex flex-col space-y-1 items-start w-full">
                <label htmlFor="salaryRange" className="font-medium">
                  Salary Range
                </label>
                <div className="flex space-x-2 w-full">
                  <div className="flex space-x-1 items-center justify-start w-full border-[1px] border-zinc-300 focus:border-black rounded-md px-2">
                    <PiArrowsDownUpThin size={20} />
                    <input
                      type="text"
                      name="min"
                      value={jobData.salaryRange.min}
                      onChange={handleOnChange}
                      required
                      className="py-2 font-medium w-full outline-none focus:border-black rounded-md placeholder:font-normal"
                      placeholder="&#8377;0"
                    />
                  </div>
                  <div className="flex space-x-1 items-center justify-start w-full border-[1px] border-zinc-300 focus:border-black rounded-md px-2">
                    <PiArrowsDownUpThin size={20} />
                    <input
                      type="text"
                      name="max"
                      value={jobData.salaryRange.max}
                      onChange={handleOnChange}
                      required
                      className="py-2 font-medium w-full outline-none focus:border-black rounded-md placeholder:font-normal placeholder:text-sm"
                      placeholder="&#8377; 12 'LPA'"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1 items-start w-full">
                <label htmlFor="applicationDeadline" className="font-medium">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={jobData.applicationDeadline}
                  onChange={handleOnChange}
                  required
                  className="px-4 py-2 font-medium border-[1px] w-full border-zinc-300 outline-none focus:border-black rounded-md placeholder:font-normal"
                />
              </div>
              <div className="flex flex-col space-y-1 items-start w-full col-span-full">
                <label htmlFor="jobDescription" className="font-medium">
                  Job Description
                </label>
                <textarea
                  name="jobDescription"
                  value={jobData.jobDescription}
                  onChange={handleOnChange}
                  rows={6}
                  required
                  className="px-4 py-2 font-medium border-[1px] border-zinc-300 outline-none focus:border-black rounded-md placeholder:font-normal w-full"
                  placeholder="Please share a description to let the candidate know more about the job role"
                />
              </div>
              <div className="flex justify-between w-full col-span-full">
                <button
                  type="button"
                  onClick={() => {
                    console.log("save draft");
                  }}
                  className="flex items-center justify-center cursor-pointer space-x-1 px-6 w-1/4 py-2 rounded-md border-2 border-black font-medium h-fit"
                >
                  <span className="flex flex-nowrap">Save Draft</span>
                  <PiCaretDoubleDown />
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center cursor-pointer space-x-1 px-6 w-1/4 py-2 rounded-md bg-sky-500 text-white font-medium h-fit"
                >
                  <span type="submit" className="">
                    Publish
                  </span>
                  <FaAngleDoubleRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateJob;
