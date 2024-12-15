import React from "react";
import { useState, useEffect } from "react";
import { deleteJob, getJobs, logout } from "../services";
import JobCard from "../components/JobCard";
import styles from "../pages/styles/home.module.css";
import Search from "../components/Search";
import Details from "./Details";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [skills, setSkills] = useState([]);
  const fetchJobs = async () => {
    setLoading(true);

    const res = await getJobs({
      limit,
      offset: offset * limit,
      name: search,
      skills: skills,
    });
    if (res.status === 200) {
      const data = await res.json();
      setJobs(data.jobs);
      setCount(data.count);
    } else {
      console.log(res);
    }
    setLoading(false);
  };
  console.log(jobs);

  useEffect(() => {
    fetchJobs();
  }, [limit, offset, search, skills]);

  console.log("search", search);
  const handleDelete = async (id) => {
    try {
      const res = await deleteJob(id);
      if (res.status === 200) {
        alert("job deleted successfully");
        fetchJobs();
      } else {
        alert("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const handleSearch = ({ name, skills }) => {
    console.log("query recieved", { name, skills });
    setSearch(name);
    setSkills(skills);
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>Jobfinder</h1>
        <div className={styles.right}>
          <p className={styles.logout} onClick={handleLogout}>
            Logout
          </p>
          <p className={styles.text}>Hello! Recruiter</p>
        </div>
      </nav>
      <div className={styles.spacer}> </div>

      <Search onSearch={handleSearch} />
      {selectedJob ? (
        <Details job={selectedJob} onBack={handleBackToJobs} />
      ) : (
        <>
          {loading ? (
            <div>loading...</div>
          ) : (
            <>
              <div className={styles.details}>
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onDelete={handleDelete}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              <div className={styles.pagination}>
                <button
                  className={styles.btn}
                  disabled={offset === 0}
                  onClick={() => setOffset((offset) => offset - 1)}
                >
                  prev
                </button>
                <button
                  className={styles.btn}
                  disabled={offset * limit + limit >= count}
                  onClick={() => setOffset((offset) => offset + 1)}
                >
                  next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
