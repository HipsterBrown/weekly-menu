import React from "react";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { json, LoaderFunction, useLoaderData } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { format, addWeeks } from "date-fns";
import { getMenu, getSession, Menu as MenuRecord } from "../db";
import { getMenuDateFor } from "../utils";
import Menu from "./Menu";

export const loader: LoaderFunction = async ({ request }) => {
  await getSession();

  const url = new URL(request.url);
  const isPreview = url.pathname.includes("preview");
  const menuDate = getMenuDateFor(
    isPreview ? addWeeks(Date.now(), 1) : undefined
  );
  const menu = await getMenu(menuDate.toJSON());
  return json({ menuDate, menu });
};

const IndexPage: React.FC<{ preview?: boolean }> = ({ preview }) => {
  const { menuDate, menu } = useLoaderData() as {
    menuDate: string;
    menu: PouchDB.Core.ExistingDocument<MenuRecord>;
  };
  const currentWeek = format(new Date(menuDate), "MMM do");

  return (
    <Box p="3">
      <Heading mt="0" mb="4">
        Weekly Menu - {currentWeek}
      </Heading>
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
    </Box>
  );
};

export default IndexPage;
