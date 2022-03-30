import React from "react";
import { Outlet } from "react-router";
import NavBar from "./NavBar";

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
