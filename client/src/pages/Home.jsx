import React, { useContext, useEffect, useState } from "react";
import Filteration from "../components/Filteration";
import Jobs from "../components/Jobs";
import CreateJob from "../components/CreateJob";
import JobContext from "../context/JobContext";

const Home = () => {
  const { allJobs, fetchJobs } = useContext(JobContext); // Get allJobs from context
  console.log(allJobs);

  // State for filters
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
    salary: 100,
  });

  // Handle input change
  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Handle salary change
  const handleSalaryChange = (e) => {
    setFilters({
      ...filters,
      salary: e.target.value,
    });
  };

  // Filter the job data based on the selected filters
  const filteredJobs = allJobs?.filter((job) => {
    // If no filters are set, return all jobs
    if (
      filters?.title === "" &&
      filters?.location === "" &&
      filters?.jobType === "" &&
      filters?.salary === 100
    ) {
      return true;
    }

    return (
      (filters?.title === "" ||
        job.title?.toLowerCase()?.includes(filters?.title.toLowerCase())) &&
      (filters?.location === "" || job.location === filters?.location) &&
      (filters?.jobType === "" || job.type === filters?.jobType) &&
      job.salary <= filters?.salary
    );
  });

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Filteration
        filters={filters}
        onInputChange={handleInputChange}
        onSalaryChange={handleSalaryChange}
      />
      <CreateJob />
      <Jobs jobs={filteredJobs} />
    </>
  );
};

export default Home;
