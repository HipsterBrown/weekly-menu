import React from "react";
// @ts-ignore
import { unstable_createRoot as createRoot } from "react-dom";
import App from "./components/App";

createRoot(document.getElementById("root")).render(<App />);
