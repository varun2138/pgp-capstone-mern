import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Create from "../components/Create";
import { getJobById } from "../services";
import styles from "../pages/styles/createJob.module.css";
import image from "../assets/banner.png";

const EditJob = ({ isEditing = true }) => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const res = await getJobById(id);
        if (res.status === 200) {
          const data = await res.json();
          console.log("data:", data.job);
          setJobData(data.job);
        }
      } catch (error) {
        console.error("failed to fetch job Data", error);
      }
    };
    fetchJobData();
    console.log(jobData);
  }, [id]);
  return jobData ? (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {jobData && <Create isEditing={isEditing} jobData={jobData} />}
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt="image" />
      </div>
    </div>
  ) : (
    <div>
      <h1>loading...</h1>
    </div>
  );
};

export default EditJob;
