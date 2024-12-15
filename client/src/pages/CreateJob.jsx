import React from "react";
import styles from "../pages/styles/createJob.module.css";
import Create from "../components/Create";
import image from "../assets/banner.png";

const CreateJob = ({ isEditing = false, jobData = null }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Create jobData={jobData} isEditing={isEditing} />
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt="image" />
      </div>
    </div>
  );
};

export default CreateJob;
