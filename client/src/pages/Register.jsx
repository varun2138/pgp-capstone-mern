import { register } from "../services";
import { useState } from "react";
import styles from "../pages/styles/register.module.css";

export default function Register({ toggleForm }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert("please agree terms");
      return;
    }
    console.log(formData);
    const res = await register(formData);
    const data = await res.json();
    if (res.status === 201) {
      alert("registered successfully");
      toggleForm();
    } else {
      console.log(data);
      alert("error");
    }
  };
  const handleCheckBox = (e) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div className={styles.registerContainer}>
      <div className={styles.headline}>
        <h1 className={styles.heading}>Create an account?</h1>
        <p className={styles.para}>Your personal job finder is here</p>
      </div>
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <input
          className={styles.InputBox}
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.name}
          name="name"
          placeholder="enter name"
        />
        <input
          className={styles.InputBox}
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.mobile}
          name="mobile"
          placeholder="enter mobile"
        />
        <input
          className={styles.InputBox}
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.email}
          name="email"
          placeholder="enter email"
        />
        <input
          className={styles.InputBox}
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.password}
          name="password"
          placeholder="enter password"
        />
        <div className={styles.check}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckBox}
          />
          <p>
            By creating an account, I agree to our terms of use and privacy
            policy
          </p>
        </div>
        <button className={styles.submit} type="submit">
          Create Account
        </button>
      </form>
      <p className={styles.text}>
        Already have an account?{" "}
        <span onClick={toggleForm} className={styles.signup}>
          Sign In
        </span>
      </p>
    </div>
  );
}
