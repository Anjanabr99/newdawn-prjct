
import React, { useState } from "react";


import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

function App() {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  if (!token) {
    return <LoginPage setToken={setToken} setUserType={setUserType} />;
  }

  return <HomePage token={token} userType={userType} />;
}

export default App;
