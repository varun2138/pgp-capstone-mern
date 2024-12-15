import { React, useEffect, useState } from "react";
import styles from "../components/styles/create.module.css";
import { createJob, editjob } from "../services/index";
import { useNavigate } from "react-router-dom";
const Create = ({ jobData = null, isEditing = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    logo: "",
    jobPosition: "",
    salary: "",
    jobType: "",
    location: "",
    work: "",
    description: "",
    companyInfo: "",
    skills: [],
  });
  const jobTypes = [
    "full-time",
    "part-time",
    "contract",
    "internship",
    "freelance",
  ];
  const workPlace = ["office", "remote"];

  useEffect(() => {
    if (isEditing && jobData) {
      setFormData(jobData);
    }
  }, [isEditing, jobData]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSkillInputChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      skillInput: value,
    }));
  };
  const handleSkillInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkills = formData.skillInput
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill && !formData.skills.includes(skill));

      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, ...newSkills],
        skillInput: "",
      }));
    }
  };
  const handleRemoveSkill = (skill) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter(
        (selectedSkill) => selectedSkill !== skill
      ),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = isEditing
        ? await editjob(jobData._id, formData)
        : await createJob(formData);
      if (res.status === 201 || res.status === 200) {
        alert(
          isEditing ? "job updated successfully" : "job created successfully"
        );
      } else {
        alert("Error creating job");
      }
      navigate("/");
    } catch (error) {
      console.error("Error", error);
      alert("something went wrong");
    }
  };

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {isEditing ? "Edit Job Description" : "Add Job Description"}
      </h1>
      <form onSubmit={handleSubmit} className={styles.formUI}>
        <div className={styles.InputBox}>
          <label className={styles.label} htmlFor="companyName">
            Company Name
          </label>
          <input
            className={styles.InputField}
            type="text"
            name="companyName"
            id="companyName"
            placeholder="Enter your company name here"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.InputBox}>
          <label className={styles.label} htmlFor="logo">
            Add logo Url
          </label>
          <input
            className={styles.InputField}
            type="url"
            name="logo"
            id="logo"
            placeholder="Enter the link"
            value={formData.logo}
            onChange={handleChange}
          />
        </div>
        <div className={styles.InputBox}>
          <label className={styles.label} htmlFor="jobPosition">
            Job position
          </label>
          <input
            className={styles.InputField}
            type="text"
            name="jobPosition"
            id="jobPosition"
            placeholder="Enter job position"
            value={formData.jobPosition}
            onChange={handleChange}
          />
        </div>
        <div className={styles.InputBox}>
          <label className={styles.label} htmlFor="salary">
            Monthly salary
          </label>
          <input
            className={styles.InputField}
            type="number"
            name="salary"
            id="salary"
            placeholder="Enter amount in rupees"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className={`${styles.InputBox} ${styles.selectedWrapper}`}>
          <label htmlFor="jobType" className={styles.label}>
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            className={styles.dropdown}
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select job type
            </option>
            {jobTypes?.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className={`${styles.InputBox} ${styles.selectedWrapper}`}>
          <label htmlFor="work" className={styles.label}>
            remote/office
          </label>
          <select
            id="work"
            name="work"
            className={styles.dropdown}
            value={formData.work}
            onChange={handleChange}
          >
            <option value="" disabled className={styles.optons}>
              remote/office
            </option>
            {workPlace?.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className={styles.InputBox}>
          <label className={styles.label} htmlFor="location">
            location
          </label>
          <input
            className={styles.InputField}
            type="text"
            name="location"
            id="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className={styles.InputBox}>
          <label className={styles.label} htmlFor="description">
            Job Description
          </label>
          <textarea
            className={styles.InputField}
            name="description"
            id="description"
            placeholder="Type your description here"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className={styles.InputBox}>
          <label className={styles.label} htmlFor="companyInfo">
            About Company
          </label>
          <textarea
            className={styles.InputField}
            name="companyInfo"
            id="companyInfo"
            placeholder="Type about your company"
            value={formData.companyInfo}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles.InputBox} ${styles.selectedWrapper}`}>
          <label htmlFor="skills" className={styles.label}>
            Skills required
          </label>
          <input
            type="text"
            id="skills"
            value={formData.skillInput || ""}
            onChange={handleSkillInputChange}
            className={styles.InputField}
            placeholder="enter skills here and press Enter or comma"
            onKeyDown={handleSkillInput}
          />
        </div>

        <div className={styles.skills}>
          {formData?.skills?.map((skill) => (
            <div key={skill} className={styles.skill}>
              <span className={styles.text}>{skill}</span>
              <button
                className={styles.deleteBtn}
                type="button"
                onClick={() => handleRemoveSkill(skill)}
              >
                x
              </button>
            </div>
          ))}
        </div>

        <button className={styles.createBtn} type="submit">
          {isEditing ? "Update Job" : "Create Job"}
        </button>
      </form>
      <button onClick={handleClick} className={styles.cancelBtn}>
        cancel
      </button>
    </div>
  );
};

export default Create;
