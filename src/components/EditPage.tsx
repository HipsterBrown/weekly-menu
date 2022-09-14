import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { format, addWeeks } from "date-fns";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "react-router";
import { local, Menu, getSession, getMenu, Menu as MenuRecord } from "../db";
import { getMenuDateFor } from "../utils";
import MenuForm from "./MenuForm";

const BLANK_MENU: Menu = {
  M: "",
  T: "",
  W: "",
  Th: "",
  F: "",
  Sa: "",
  Su: "",
};

export const loader: LoaderFunction = async ({ request }) => {
  await getSession();

  const url = new URL(request.url);
  const isPlanning = url.pathname.includes("plan");

  const menuDate = getMenuDateFor(
    isPlanning ? addWeeks(Date.now(), 1) : undefined
  );
  try {
    const menu = await getMenu(menuDate.toJSON());
    return json({ menuDate, menu });
  } catch (error) {
    if (error instanceof Response && error.status === 404) {
      return json({
        menuDate,
        menu: { ...BLANK_MENU, _id: menuDate.toJSON() },
      });
    }
    throw error;
  }
};

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const formData = Object.fromEntries(await request.formData());
  console.log({ formData });
  try {
    await local.put(
      (formData as unknown) as PouchDB.Core.PutDocument<
        Menu & PouchDB.Core.IdMeta & PouchDB.Core.ExistingDocument<Menu>
      >
    );
    return redirect(url.pathname.includes("plan") ? "/preview" : "/");
  } catch (error) {
    console.warn(error);
    return json(null);
  }
};

const EditPage: React.FC<{ planning?: boolean }> = () => {
  const { menuDate, menu } = useLoaderData() as {
    menuDate: string;
    menu: PouchDB.Core.ExistingDocument<MenuRecord>;
  };
  const currentWeek = format(new Date(menuDate), "MMM do");
  console.log("EditPage", { menu });

  return (
    <Box mx="auto" maxWidth="500px" p="3">
      <Heading mt="0" mb="4">
        Edit Weekly Menu - {currentWeek}
      </Heading>
      <MenuForm menu={menu} />
    </Box>
  );
};

export default EditPage;
