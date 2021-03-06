import React, { Suspense } from "react";
import {
  Box,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
  Text
} from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { format, addWeeks } from "date-fns";
import { useQueryDB } from "../db";
import { getMenuDateFor } from "../utils";
import SessionErrorBoundary from "./SessionErrorBoundary";
import { createErrorBoundary } from "./NotFoundErrorBoundary";
import NavBar from "./NavBar";
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

const IndexPage: React.FC<{ preview?: boolean }> = ({ preview }) => {
  const menuDate = getMenuDateFor(
    preview ? addWeeks(Date.now(), 1) : undefined
  );
  const currentWeek = format(menuDate, "MMM do");
  const menu = useQueryDB(menuDate.toJSON());

  return (
    <>
      <NavBar />
      <Box p="3">
        <Heading mt="0" mb="4">
          Weekly Menu - {currentWeek}
        </Heading>
        <NotFoundErrorBoundary>
          <SessionErrorBoundary>
            <Suspense fallback={<MenuLoader />}>
              <Menu menu={menu} />
              <Text pb="4">
                {preview || (
                  <>
                    <Link color="teal.500" as={RouterLink} to="/edit" pr="3">
                      Edit
                    </Link>
                    |
                    <Link color="teal.500" as={RouterLink} to="/plan" px="3">
                      Plan next week
                    </Link>
                    |
                    <Link color="teal.500" as={RouterLink} to="/preview" pl="3">
                      Preview next week
                    </Link>
                  </>
                )}
                {preview && (
                  <>
                    <Link color="teal.500" as={RouterLink} to="/plan" pr="3">
                      Plan
                    </Link>
                    |
                    <Link color="teal.500" as={RouterLink} to="/" pl="3">
                      Return
                    </Link>
                  </>
                )}
              </Text>
            </Suspense>
          </SessionErrorBoundary>
        </NotFoundErrorBoundary>
      </Box>
    </>
  );
};

export default IndexPage;
