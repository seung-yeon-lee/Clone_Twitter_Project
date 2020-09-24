import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  navUl: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  navProfile: {
    marginLeft: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "12px",
  },
});

const Navigation = ({ userObj }) => {
  const classes = useStyles();
  return (
    <nav>
      <ul className={classes.navUl}>
        <li>
          <Link to="/" className={classes.navProfile}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
            <span style={{ marginTop: 10 }}>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className={classes.navProfile}>
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 프로필`
                : "프로필"}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
