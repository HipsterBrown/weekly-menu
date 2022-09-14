import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { format } from "date-fns";
import { getMenu, login, Menu as MenuRecord } from "../db";
import { getMenuDateFor } from "../utils";
import Menu from "./Menu";
import { json, LoaderFunction, useLoaderData } from "react-router";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  const password = url.searchParams.get("password");

  if (!username || !password) {
    throw new Response("Must be authenticated to continue", { status: 401 });
  }

  await login(username, password);

  const menuDate = getMenuDateFor();
  const menu = await getMenu(menuDate.toJSON());
  return json({ menuDate, menu });
};

const DisplayModePage: React.FC = () => {
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
    </Box>
  );
};

export default DisplayModePage;
