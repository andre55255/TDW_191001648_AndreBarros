import React, { useState } from "react";

interface IProps {
  children: React.ReactNode;
}

export const authContext = React.createContext({});

export const AuthProvider = (props: IProps) => {
  const [user, setUser] = useState({
    firstname: String,
    lastname: String,
    token: String,
  });

  return (
    <authContext.Provider value={{ user, setUser }}>
      {props.children}
    </authContext.Provider>
  );
};
