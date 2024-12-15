import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import styles from "../pages/styles/MainPage.module.css";
import image from "../assets/image.png";

const MainPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {isLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Register toggleForm={toggleForm} />
        )}
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt="image" />
      </div>
    </div>
  );
};

export default MainPage;
