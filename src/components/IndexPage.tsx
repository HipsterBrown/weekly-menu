import React, { Suspense } from "react";
import { Heading, Link, SimpleGrid, Skeleton, Text } from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import { useQueryDB } from "../db";
import { getMenuDateFor } from "../utils";
import SessionErrorBoundary from "./SessionErrorBoundary";
import { createErrorBoundary } from "./NotFoundErrorBoundary";
import Menu from "./Menu";

const MenuFallback: React.FC = () => (
  <>
    <Text>No menu found for this week.</Text>
    <Link color="teal.500" as={RouterLink} to="/edit" pb="4">
      Add menu items
    </Link>
  </>
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

const IndexPage: React.FC = () => {
  const menuDate = getMenuDateFor();
  const currentWeek = format(menuDate, "MMM do");
  const menu = useQueryDB(menuDate.toJSON());

  return (
    <>
      <Heading mt="0" mb="4">
        Weekly Menu - {currentWeek}
      </Heading>
      <NotFoundErrorBoundary>
        <SessionErrorBoundary>
          <Suspense fallback={<MenuLoader />}>
            <Menu menu={menu} />
            <Link color="teal.500" as={RouterLink} to="/edit" pb="4">
              Edit
            </Link>
          </Suspense>
        </SessionErrorBoundary>
      </NotFoundErrorBoundary>
    </>
  );
};

export default IndexPage;
