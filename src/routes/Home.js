import Twiite from "components/Twiite";
import TwiiteFactory from "components/TwiiteFactory";
import { db } from "firebase_instance";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    width: "100%",
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
  },
});

const Home = ({ userObj }) => {
  const classes = useStyles();
  const [twiites, setTwiites] = useState([]);

  useEffect(() => {
    db.collection("twiites").onSnapshot((snap) => {
      const twiiteArray = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTwiites(twiiteArray);
    });
  }, []);
  return (
    <div className={classes.container}>
      <TwiiteFactory userObj={userObj} />
      <div>
        {twiites.map((
          twiite // Update, Delete 부분 코드 분리
        ) => (
          <Twiite
            key={twiite.id}
            twiiteObj={twiite}
            isOwner={twiite.creator === userObj.uid}
            // True or False, 글 생성자와 로그인한 id가 같은지 여부
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
