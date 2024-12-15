import React from "react";
import styles from "../components/styles/JobCard.module.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import flag from "../assets/flag.png";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onDelete, onViewDetails }) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/edit/${job._id}`);
  };

  const handleDeleteClick = () => {
    onDelete(job._id);
  };
  const handleViewDetailsClick = () => {
    onViewDetails(job);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={job?.logo} alt="image" />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{job.jobPosition}</h1>
          <div className={styles.details}>
            <div className={styles.requirement}>
              {/* icon */}
              <IoPeopleSharp />
              <p>11-50</p>
            </div>
            <div className={styles.salary}>
              {/* icon */}
              <FaIndianRupeeSign />
              <p>{job.salary}</p>
            </div>
            <div className={styles.location}>
              {/* icon */}
              <img src={flag} className={styles.flag} />
              <p>{job.location}</p>
            </div>
          </div>
          <div className={styles.timing}>
            <p>{job.work}</p>
            <p>{job.jobType}</p>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.skills}>
          {job.skills?.map((skill, index) => (
            <p key={index} className={styles.badge}>
              {skill}
            </p>
          ))}
        </div>
        <div className={styles.buttons}>
          <button onClick={handleEditClick} className={styles.Editbtn}>
            Edit job
          </button>
          <button onClick={handleDeleteClick} className={styles.Editbtn}>
            Delete job
          </button>
          <button onClick={handleViewDetailsClick} className={styles.view}>
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
