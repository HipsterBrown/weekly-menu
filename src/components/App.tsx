import React, { Suspense } from "react";
import { ChakraProvider, Box, Spinner, Text, Link } from "@chakra-ui/react";
import {
  isRouteErrorResponse,
  Route,
  useRouteError,
  createRoutesFromElements,
  RouterProvider,
  redirect,
} from "react-router";
import { Link as RouterLink, createBrowserRouter } from "react-router-dom";
import AppLayout, { loader as sessionLoader } from "./AppLayout";
import { logout } from "../db";
import { hasStatus } from "../utils";

const IndexPage = React.lazy(() => import("./IndexPage"));
const EditPage = React.lazy(() => import("./EditPage"));
const DisplayModePage = React.lazy(() => import("./DisplayModePage"));
const LoginPage = React.lazy(() => import("./LoginPage"));

const PageLoader: React.FC = ({ children }) => (
  <Suspense fallback={<Spinner label="Loading page" />}>{children}</Suspense>
);

const RootBoundary: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <Text>No menu found for this week.</Text>;
    }
  }
  if (hasStatus(error) && error.status === 401) {
    return (
      <Box p="4">
        <Text>Must be logged in to continue</Text>
        <Link color="teal.500" as={RouterLink} to="/login">
          Login
        </Link>
      </Box>
    );
  }

  return (
    <Text color="red.500" fontWeight="bold">
      Unexpected error. Please try reloading the page or informing the admin
    </Text>
  );
};

const MenuFallback: React.FC<{ preview?: boolean }> = ({ preview }) => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Box p="4">
        <Text>No menu found for this week.</Text>
        <Link
          color="teal.500"
          as={RouterLink}
          to={preview ? "/plan" : "/edit"}
          pb="4"
        >
          Add menu items
        </Link>
      </Box>
    );
  }
  throw error;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppLayout />}
      errorElement={<RootBoundary />}
      loader={sessionLoader}
      id="root"
    >
      <Route
        index
        errorElement={<MenuFallback />}
        loader={async (args) => {
          const { loader } = await import("./IndexPage");
          return loader(args);
        }}
        element={
          <PageLoader>
            <IndexPage />
          </PageLoader>
        }
      />
      <Route
        path="preview"
        errorElement={<MenuFallback preview={true} />}
        loader={async (args) => {
          const { loader } = await import("./IndexPage");
          return loader(args);
        }}
        element={
          <PageLoader>
            <IndexPage preview={true} />
          </PageLoader>
        }
      />
      <Route
        path="edit"
        loader={async (args) => {
          const { loader } = await import("./EditPage");
          return loader(args);
        }}
        action={async (args) => {
          const { action } = await import("./EditPage");
          return action(args);
        }}
        element={
          <PageLoader>
            <EditPage />
          </PageLoader>
        }
      />
      <Route
        path="plan"
        loader={async (args) => {
          const { loader } = await import("./EditPage");
          return loader(args);
        }}
        action={async (args) => {
          const { action } = await import("./EditPage");
          return action(args);
        }}
        element={
          <PageLoader>
            <EditPage planning={true} />
          </PageLoader>
        }
      />
      <Route
        path="display-mode"
        loader={async (args) => {
          const { loader } = await import("./DisplayModePage");
          return loader(args);
        }}
        element={
          <PageLoader>
            <DisplayModePage />
          </PageLoader>
        }
      />
      <Route
        path="login"
        loader={async (args) => {
          const { loader } = await import("./LoginPage");
          return loader(args);
        }}
        action={async (args) => {
          const { action } = await import("./LoginPage");
          return action(args);
        }}
        element={
          <PageLoader>
            <LoginPage />
          </PageLoader>
        }
      />
      <Route
        path="logout"
        action={async ({ request }) => {
          if (request.method === "DELETE") {
            await logout();
            return redirect("/login");
          }
          return redirect("/");
        }}
      />
    </Route>
  )
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
        <RouterProvider
          router={router}
          fallbackElement={<Spinner label="loading application" />}
        />
      </Box>
    </ChakraProvider>
  );
};

export default App;
