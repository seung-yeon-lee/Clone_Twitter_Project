import { authService, db } from "firebase_instance";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
// 내 트윗보고 프로필 업데이트 기능 구현하기

const useStyles = makeStyles({
  container: {
    width: "100%",
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
  },
  profileForm: {
    borderBottom: "1px solid rgba(255,255,255,0.9)",
    paddingBottom: "30px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  formInput: {
    width: "100%",
    padding: "10px 20px",
    border: "1px solid black",
    textAlign: "center",
    background: "white",
    color: "black",
    borderRadius: "30px",
  },
  formBtn: {
    cursor: "pointer",
    padding: "7px 20px",
    width: "100%",
    marginTop: "15px",
    textAlign: "center",
    color: "white",
    background: "#04aaff",
    cursor: "pointer",
  },
});

export default ({ userObj, refresh }) => {
  const classes = useStyles();
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getTwiites = async () => {
    // DB데이터 필터링 부분
    const twiites = await db
      .collection("twiites")
      .where("creator", "==", userObj.uid)
      .orderBy("createAt") //index 생성해야 정상출력 noSql기반이기떄문에
      .get();
    console.log(twiites.docs.map((doc) => doc.data()));
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        // props로 받은 userObj에 new func 정의하였음
        displayName: newDisplayName,
      });
      refresh();
    }
  };
  useEffect(() => {
    getTwiites();
  }, []);
  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit} className={classes.profileForm}>
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
          autoFocus
          className={classes.formInput}
        />
        <input
          type="submit"
          value="Update Profile"
          className={classes.formBtn}
        />
      </form>
      <span
        className={classes.formBtn}
        style={{ cursor: "pointer", backgroundColor: "tomato" }}
        onClick={onLogOutClick}
      >
        Log Out
      </span>
    </div>
  );
};
