import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/styles/search.module.css";

const Search = ({ onSearch }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const timeOutId = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
    }
    timeOutId.current = setTimeout(() => {
      onSearch({ name: value, skills });
    }, 1000);
  };
  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
      onSearch({ name: search, skills: [...skills, currentSkill.trim()] });
    }
  };
  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill != skillToRemove);
    setSkills(updatedSkills);
    onSearch({ name: search, skills: updatedSkills });
  };

  const handleCick = () => {
    navigate("/create");
  };

  return (
    <div className={styles.container}>
      <div className={styles.Inputs}>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="search here"
          className={styles.search}
        />

        <input
          type="text"
          value={currentSkill}
          onChange={(e) => setCurrentSkill(e.target.value)}
          placeholder="Add skill to filter "
          className={styles.search}
        />
      </div>

      <div className={styles.skillsList}>
        {skills.map((skill, index) => (
          <span key={index} className={styles.skill}>
            {skill}
            <button
              onClick={() => handleRemoveSkill(skill)}
              className={styles.removeSkillBtn}
            >
              {" "}
              X
            </button>
          </span>
        ))}
      </div>
      <div className={styles.skillset}>
        <button onClick={handleAddSkill} className={styles.skillBtn}>
          Add skill
        </button>
        <button onClick={handleCick} className={styles.create}>
          create job
        </button>
      </div>
    </div>
  );
};

export default Search;
