import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase_instance";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        }); // 로그인 시 호출, user 정보를 저장(uid로 작성자 구별할 예정이므로)
      } else {
        setUserObj(null);
      }
      setInit(true); // 항상 true, 언제 시작해도 onAuth..가 실행되어야 하므로
    });
  }, []);
  // 프로필 새로고침해야 나타나는 현상, userObj를 바뀔때마다 렌더링되게 구현
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refresh={refreshUser}
          userObj={userObj}
          isLoggedIn={Boolean(userObj)}
        />
      ) : (
        "Initializing...."
      )}
    </>
  );
}

export default App;
