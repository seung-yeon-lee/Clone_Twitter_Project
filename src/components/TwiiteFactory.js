import { db, storageService } from "firebase_instance";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  factoryForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    position: "relative",
    marginBottom: "20px",
    width: "100%",
  },
  input: {
    flexGrow: 1,
    height: "40px",
    padding: "0px 20px",
    color: "white",
    fontWeight: 800,
    fontSize: "12px",
    border: "2px solid #04aaff",
    borderRadius: "20px",
  },
  inputArrow: {
    position: "absolute",
    right: 0,
    background: "#04aaff",
    height: "22px",
    width: "40px",
    padding: "10px 0px",
    textAlign: "center",
    borderRadius: "20px",
    color: "#ffffff",
  },
  factoryFile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  factoryFileImg: {
    height: "80px",
    width: "80px",
    borderRadius: "40px",
    backgroundImage: "attachment",
  },

  factoryFormClear: {
    color: "#04aaff",
    cursor: "pointer",
    textAlign: "center",
  },
});

const TwiiteFactory = ({ userObj }) => {
  const classes = useStyles();
  const [twiite, setTwiite] = useState("");
  const [file, setFile] = useState("");

  const onSubmit = async (e) => {
    if (twiite === "") {
      return;
    }
    e.preventDefault();
    let fileUrl = "";
    if (file !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); // uuid 특별한 식별자를 랜덤으로 해주는 모듈
      const res = await fileRef.putString(file, "data_url"); // reader.readAsDataURL 참조
      fileUrl = await res.ref.getDownloadURL();
    }
    const data = {
      text: twiite,
      createAt: Date.now(),
      creator: userObj.uid,
      fileUrl,
    };
    await db.collection("twiites").add(data);
    setTwiite("");
    setFile("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTwiite(value);
  };
  const fileChange = (e) => {
    // 파일 업로드 전 미리보기 기능 추가
    const {
      target: { files },
    } = e;
    const file = files[0];
    const reader = new FileReader(); // fileReader Api 사용
    reader.onloadend = (finishedEvent) => {
      //파일 로딩끝날떄,읽는게 끝난다면
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFile(result);
    };
    reader.readAsDataURL(file); // 그 후에 실행
  };

  const onClearPhoto = () => setFile("");

  return (
    <form onSubmit={onSubmit} className={classes.factoryForm}>
      <div className={classes.inputContainer}>
        <input
          className={classes.input}
          type="text"
          placeholder="What's on your Mind?"
          value={twiite}
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="&rarr;" className={classes.inputArrow} />
      </div>
      <label htmlFor="file_img" style={{ cursor: "pointer", color: "#04aaff" }}>
        <span style={{ marginRight: "10px", fontSize: "12px" }}>
          Add Photos
        </span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="file_img"
        type="file"
        accept="image/*"
        onChange={fileChange}
        style={{ opacity: 0 }}
      />
      {file && (
        <div className={classes.factoryFile}>
          <img src={file} className={classes.factoryFileImg} />
          <div className={classes.factoryFormClear} onClick={onClearPhoto}>
            <span
              style={{
                marginRight: "10px",
                fontSize: "13px",
              }}
            >
              Remove
            </span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default TwiiteFactory; 
