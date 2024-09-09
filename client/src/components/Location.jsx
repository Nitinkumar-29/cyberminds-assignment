import React, { useContext } from "react";
import JobContext from "../context/JobContext"; // Import your JobContext

const Location = () => {
  const { jobData, setJobData } = useContext(JobContext); // Access jobData and setJobData from context

  const LocationData = [
    "Chennai",
    "Mumbai",
    "Bengaluru",
    "Gurugram",
    "Delhi",
    "Pune",
  ];

  // Handle select change
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setJobData({
      ...jobData,
      Location: selectedLocation, // Update Location in jobData
    });
  };

  return (
    <div className="flex flex-col space-y-1 items-start w-full">
      <label htmlFor="location" className="font-medium">
        Location
      </label>
      <select
        name="location"
        value={jobData.Location}
        onChange={handleLocationChange}
        required
        className={`px-2 py-2 font-medium border-[1px] w-full border-zinc-300 outline-none focus:border-black rounded-md ${
          jobData.Location === "" ? "text-zinc-500" : "text-black"
        }`}
      >
        {/* Use a more subdued styling for the placeholder option */}
        <option value="" disabled className="text-gray-400">
          Choose Preferred Location
        </option>
        {LocationData.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Location;
