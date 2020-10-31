import React, { Suspense, useEffect } from "react";
import {
  Box,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
  Text
} from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import { useQueryDB, useSession } from "../db";
import { getMenuDateFor, useQueryParams } from "../utils";
import SessionErrorBoundary from "./SessionErrorBoundary";
import { createErrorBoundary } from "./NotFoundErrorBoundary";
import Menu from "./Menu";

const MenuFallback: React.FC = () => (
  <Text>
    No menu found for this week. Please add menu items on a different device.
  </Text>
);

const MenuLoader: React.FC = () => (
  <SimpleGrid spacingY="3" maxWidth="300px">
    <Skeleton height="30px" />
    <Skeleton height="30px" />
    <Skeleton height="30px" />
    <Skeleton height="30px" />
    <Skeleton height="30px" />
    <Skeleton height="30px" />
    <Skeleton height="30px" />
  </SimpleGrid>
);

const NotFoundErrorBoundary = createErrorBoundary(<MenuFallback />);

const DisplayModePage: React.FC = () => {
  const menuDate = getMenuDateFor();
  const currentWeek = format(menuDate, "MMM do");
  const menu = useQueryDB(menuDate.toJSON());
  const { username, password } = useQueryParams<{
    username: string;
    password: string;
  }>();
  const { session, login } = useSession();

  useEffect(() => {
    if (username && password) {
      login(username, password);
    }
  }, [username, password]);

  return (
    <Box p="3">
      <Heading mt="0" mb="4">
        Weekly Menu - {currentWeek}
      </Heading>
      <NotFoundErrorBoundary key={session?.name}>
        <SessionErrorBoundary>
          <Suspense fallback={<MenuLoader />}>
            <Menu menu={menu} />
          </Suspense>
        </SessionErrorBoundary>
      </NotFoundErrorBoundary>
    </Box>
  );
};

export default DisplayModePage;
