import React, { Suspense } from "react";
import { Box, Heading, Spinner } from "@chakra-ui/core";
import { format } from "date-fns";
import { useHistory } from "react-router";
import { local, useQueryDB, Menu, MenuResource } from "../db";
import { getMenuDateFor } from '../utils';
import SessionErrorBoundary from "./SessionErrorBoundary";
import { createErrorBoundary } from "./NotFoundErrorBoundary";
import NavBar from './NavBar';
import MenuForm from "./MenuForm";

const BLANK_MENU: Menu = {
  M: "",
  T: "",
  W: "",
  Th: "",
  F: "",
  Sa: "",
  Su: ""
};

const useMenuUpdate = (menuDate: string) => {
  const history = useHistory();
  const onSubmit = async (
    values: Menu,
    doc: ReturnType<MenuResource["read"]>
  ) => {
    await local.put({ _id: menuDate, ...doc, ...values });
    history.push("/");
  };
  return onSubmit;
};

const FallbackForm: React.FC = () => {
  const menuDate = getMenuDateFor().toJSON();
  const blankMenuResource = {
    read() {
      return BLANK_MENU as ReturnType<MenuResource["read"]>;
    }
  };
  const onSubmit = useMenuUpdate(menuDate);
  return <MenuForm menu={blankMenuResource} onSubmit={onSubmit} />;
};

const NotFoundErrorBoundary = createErrorBoundary(<FallbackForm />);

const EditPage: React.FC = () => {
  const menuDate = getMenuDateFor();
  const currentWeek = format(menuDate, "MMM do");
  const menu = useQueryDB(menuDate.toJSON());
  const onSubmit = useMenuUpdate(menuDate.toJSON());

  return (
    <>
    <NavBar />
    <Box mx="auto" maxWidth="500px" p="3">
      <Heading mt="0" mb="4">
        Edit Weekly Menu - {currentWeek}
      </Heading>
      <NotFoundErrorBoundary>
        <SessionErrorBoundary>
          <Suspense fallback={<Spinner size="lg" />}>
            <MenuForm menu={menu} onSubmit={onSubmit} />
          </Suspense>
        </SessionErrorBoundary>
      </NotFoundErrorBoundary>
    </Box>
    </>
  );
};

export default EditPage;
