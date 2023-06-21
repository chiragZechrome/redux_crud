import React from "react";
import { Navigate } from "react-router-dom";

const credentials = {
  userId: "Chirag",
  password: "123",
};

const Protected = ({ loginCredentials, children }) => {
  if (
    loginCredentials.userId === credentials.userId &&
    loginCredentials.password === credentials.password
  ) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Protected;
