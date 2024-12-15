import React from "react";
import styles from "../pages/styles/details.module.css";
import paylogo from "../assets/pay.png";
import durationlogo from "../assets/duration.png";
const Details = ({ job, onBack }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <button onClick={onBack} className={styles.EditBtn}>
          Back
        </button>
        <p>
          {job.jobPosition} job/internship At {job.companyName}
        </p>
      </div>
      <div className={styles.jobDetails}>
        <div className={styles.heading}>
          <p>{job.jobType}</p>
          <div className={styles.logo}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={job?.logo} alt="image" />
            </div>
            <div>{job.companyName}</div>
          </div>
        </div>

        <div className={styles.position}>
          <h1>{job.jobPosition}</h1>
          <button className={styles.EditBtn}> Edit Job</button>
        </div>

        <div className={styles.location}>
          <p>{job.location}</p>| India
        </div>

        <div className={styles.pay}>
          <div className={styles.icon}>
            <div className={styles.icon1}>
              <img src={paylogo} alt="" />
              <p>stipend</p>
            </div>
            <p className={styles.payCheck}>Rs:{job.salary}/month</p>
          </div>
          <div className={styles.icon}>
            <div className={styles.icon1}>
              <img src={durationlogo} alt="" />
              <p>duration</p>
            </div>
            <p className={styles.duration}>6 months</p>
          </div>
        </div>

        <div className={styles.description}>
          <h1 className={styles.desc_title}>About Company</h1>
          <p className={styles.content}>{job.companyInfo}</p>
        </div>
        <div className={styles.description}>
          <h1 className={styles.desc_title}>About the job/internship</h1>
          <p className={styles.content}>{job.description}</p>
        </div>
        <div className={styles.description}>
          <h1 className={styles.desc_title}>Skill(s) required</h1>
          <p className={styles.skills}>
            {job.skills.map((skill, index) => (
              <p key={index} className={styles.skill}>
                {skill}
              </p>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
