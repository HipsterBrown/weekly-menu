import React, { Suspense } from "react";
import { ChakraProvider, Box, Spinner } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./AppLayout";

const IndexPage = React.lazy(() => import("./IndexPage"));
const EditPage = React.lazy(() => import("./EditPage"));
const DisplayModePage = React.lazy(() => import("./DisplayModePage"));
const LoginPage = React.lazy(() => import("./LoginPage"));

const PageLoader: React.FC = ({ children }) => (
  <Suspense fallback={<Spinner label="Loading page" />}>{children}</Suspense>
);

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
              <Route
                index
                element={
                  <PageLoader>
                    <IndexPage />
                  </PageLoader>
                }
              />
              <Route
                path="preview"
                element={
                  <PageLoader>
                    <IndexPage preview={true} />
                  </PageLoader>
                }
              />
              <Route
                path="edit"
                element={
                  <PageLoader>
                    <EditPage />
                  </PageLoader>
                }
              />
              <Route
                path="plan"
                element={
                  <PageLoader>
                    <EditPage planning={true} />
                  </PageLoader>
                }
              />
            </Route>
            <Route
              path="/display-mode"
              element={
                <PageLoader>
                  <DisplayModePage />
                </PageLoader>
              }
            />
            <Route
              path="/login"
              element={
                <PageLoader>
                  <LoginPage />
                </PageLoader>
              }
            />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
};

export default App;
