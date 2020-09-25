import { authService } from "firebase_instance";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    width: "100%",
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
  },
  authInput: {
    maxWidth: "320px",
    width: "100%",
    padding: "10px",
    borderRadius: "30px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginBottom: "10px",
    fontSize: "12px",
    color: "black",
  },
  authSubmit: {
    textAlign: "center",
    background: "#04aaff",
    color: "white",
    marginTop: "10px",
    cursor: "pointer",
  },
  authError: {
    color: "tomato",
    textAlign: "center",
    fontWeight: 500,
    fontSize: "12px",
    marginTop: "5px",
  },
  authSwitch: {
    color: "#04aaff",
    cursor: "pointer",
    marginTop: "10px",
    marginBottom: "50px",
    display: "block",
    fontSize: "14px",
    textDecoration: "underline",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const AuthForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password 
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <div className={classes.center}>
      <form onSubmit={onSubmit} className={classes.container}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className={classes.authInput}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className={classes.authInput}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
          className={classes.authSubmit}
        />
        {error && <span className={classes.authError}>{error}</span>}
      </form>
      <span onClick={toggleAccount} className={classes.authSwitch}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </div>
  );
};

export default AuthForm;
