import React from "react";
import { json, Outlet } from "react-router";
import { remote } from "../db";
import NavBar from "./NavBar";

export const loader = async () => {
  try {
    const { userCtx } = await remote.getSession();
    return json(userCtx);
  } catch (error) {
    console.log("Session loader", { error });
    return json(null);
  }
};

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
