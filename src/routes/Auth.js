import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "firebase_instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  authContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    cursor: "pointer",
    borderRadius: "20px",
    border: "none",
    padding: "10px 0px",
    fontSize: "12px",
    textAlign: "center",
    background: "white",
    width: "150px",
  },
});

const Auth = () => {
  const classes = useStyles();
  const googleClick = async (e) => {
    let provider;
    const {
      target: { name },
    } = e;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div className={classes.authContainer}>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04aaff"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div
        style={{
          display: "flex",
          maxWidth: "320px",
          justifyContent: "center",
          flexDirection: "column",
        }}
        onClick={googleClick}
      >
        <button name="google" className={classes.btn}>
          <FontAwesomeIcon
            icon={faGoogle}
            style={{ marginBottom: 5 }}
            color={"blue"}
          />
          <div>
            <span style={{ fontWeight: 600, fontSize: "12px" }}>
              Continue with Google
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Auth;
