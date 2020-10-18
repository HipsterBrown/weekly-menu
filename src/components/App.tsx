import React from "react";
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import { Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import IndexPage from "./IndexPage";
import EditPage from "./EditPage";
import LoginPage from "./LoginPage";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box
        p="3"
        border="8px solid"
        borderColor="pink.500"
        height="100vh"
        bg="white"
        overflow="scroll"
      >
        <Router>
          <Route path="/" exact component={IndexPage} />
          <Route path="/edit" component={EditPage} />
          <Route path="/login" component={LoginPage} />
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;
