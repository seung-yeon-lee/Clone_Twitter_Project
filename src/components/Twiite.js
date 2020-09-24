import { db, storageService } from "firebase_instance";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  twiit: {
    marginBottom: "20px",
    background: "white",
    width: "100%",
    maxWidth: "320px",
    padding: "20px",
    borderRadius: "10px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    color: "rgba(0,0,0,0.8)",
  },
  twiitImg: {
    right: "-10px",
    top: "20px",
    position: "absolute",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    marginTop: "10px",
  },
  twiitAction: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
  twiitEdit: {
    cursor: "pointer",
    marginTop: "15px",
    marginBottom: "15px",
    width: "100%",
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "10px 20px",
    border: "1px solid black",
    textAlign: "center",
    background: "white",
    color: "black",
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

const Twiite = ({ twiiteObj, isOwner }) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [newTwitte, setNewTwiite] = useState(twiiteObj.text);

  const Delete = async () => {
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      await db.doc(`twiites/${twiiteObj.id}`).delete();
      await storageService.refFromURL(twiiteObj.fileUrl).delete(); // 사진도 함께 삭제
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev); // 스위칭 false= true, true =false
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTwiite(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await db.doc(`twiites/${twiiteObj.id}`).update({
      text: newTwitte,
    });
    setEditing(false);
  };

  return (
    <div className={classes.twiit}>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className={classes.twiitEdit}>
            <input
              type="text"
              placeholder="Edit Your Twit"
              value={newTwitte}
              required
              onChange={onChange}
              className={classes.input}
              autoFocus={true}
            />
            <input
              type="submit"
              value="Update Twit"
              className={classes.formBtn}
            />
            <button
              style={{ cursor: "pointer", background: "tomato", marginTop: 15 }}
              onClick={toggleEditing}
            >
              Cancel
            </button>
          </form>
        </>
      ) : (
        <>
          <h4 style={{ fontSize: "15px" }}>{twiiteObj.text}</h4>
          {twiiteObj.fileUrl && (
            <img className={classes.twiitImg} src={twiiteObj.fileUrl} />
          )}
          {isOwner && ( // True일 경우에만 삭제,수정 버튼이 보여야 하므로
            <div className={classes.twiitAction}>
              <span onClick={Delete} style={{ marginRight: "10px" }}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Twiite;

// https://nomadcoders.co/nwitter/lectures/1934
