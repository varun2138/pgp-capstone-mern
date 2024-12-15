import { login } from "../services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/styles/login.module.css";
export default function Login({ toggleForm }) {
  const navigate = useNavigate();

  const [loginformData, setLoginformData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(loginformData);
    const data = await res.json();
    if (res.status === 200) {
      console.log("token:", data.token);
      localStorage.setItem("accessToken", data.token);
      alert("logged in successfully");
      navigate("/home");
    } else {
      console.log(res);
      alert("error");
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.headline}>
        <h1 className={styles.heading}>Already have an account?</h1>
        <p className={styles.para}>Your personal job finder is here</p>
      </div>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <input
          className={styles.InputBox}
          type="email"
          onChange={(e) =>
            setLoginformData({
              ...loginformData,
              [e.target.name]: e.target.value,
            })
          }
          value={loginformData.email}
          name="email"
          placeholder="enter email"
        />
        <input
          className={styles.InputBox}
          type="password"
          onChange={(e) =>
            setLoginformData({
              ...loginformData,
              [e.target.name]: e.target.value,
            })
          }
          value={loginformData.password}
          name="password"
          placeholder="enter password"
        />
        <button className={styles.submit} type="submit">
          submit
        </button>
        <p className={styles.text}>
          Don’t have an account?{" "}
          <span onClick={toggleForm} className={styles.signup}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
