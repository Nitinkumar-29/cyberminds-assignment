import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModelContext from "./ModelContext";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const { toggleDisplay } = useContext(ModelContext);
  const host = "https://cyberminds-assignment-backend.vercel.app";
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [jobData, setJobData] = useState({
    jobTitle: "",
    companyName: "",
    Location: "",
    jobType: "",
    salaryRange: {
      min: "",
      max: "",
    },
    applicationDeadline: "",
    jobDescription: "",
  });

  // Function to create a job
  const handleCreateJob = async () => {
    const {
      jobTitle,
      companyName,
      Location,
      jobType,
      salaryRange,
      applicationDeadline,
      jobDescription,
    } = jobData;

    // Check for required fields
    if (!jobTitle || !companyName || !Location || !jobType || !jobDescription) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`${host}/api/jobs/createJob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          jobTitle,
          companyName,
          Location,
          jobType,
          salaryRange,
          applicationDeadline,
          jobDescription,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message || "Failed to create job.");
        return;
      }

      // Navigate to another page or show success message
      navigate("/");
      setJobData({
        jobTitle: "",
        companyName: "",
        Location: "",
        jobType: "",
        salaryRange: {
          min: "",
          max: "",
        },
        applicationDeadline: "",
        jobDescription: "",
      });
      toggleDisplay();
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  //   fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await fetch(`${host}/api/jobs/fetchJobs`, {
        method: "GET",
      });
      if (!response.ok) {
        return console.error(response);
      }
      const data = await response.json();
      setAllJobs(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider
      value={{
        jobData,
        setJobData,
        handleCreateJob,
        errorMessage,
        fetchJobs,
        allJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
