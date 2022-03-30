import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import IndexPage from "./IndexPage";
import EditPage from "./EditPage";
import LoginPage from "./LoginPage";
import DisplayModePage from "./DisplayModePage";
import AppLayout from "./AppLayout";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Box
        border="8px solid"
        borderColor="pink.500"
        height="100vh"
        bg="white"
        overflow="scroll"
      >
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<IndexPage />} />
              <Route path="/preview" element={<IndexPage preview={true} />} />
              <Route path="/edit" element={<EditPage />} />
              <Route path="/plan" element={<EditPage planning={true} />} />
            </Route>
            <Route path="/display-mode" element={<DisplayModePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
};

export default App;
