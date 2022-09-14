/// <reference types="pouchdb" />
import React from "react";
import { List, ListItem, Grid, Text } from "@chakra-ui/react";
import { DAYS, Menu as MenuRecord } from "../db";

const MenuList: React.FC<{
  menu: PouchDB.Core.ExistingDocument<MenuRecord>;
}> = ({ menu }) => {
  return (
    <List spacing="4" px="0" mb="3">
      {DAYS.map((day) => (
        <ListItem key={day} fontFamily="body" fontSize="2xl">
          <Grid templateColumns="3rem 1fr" gap="3">
            <Text as="span" fontWeight="bold">
              {day}:
            </Text>
            {menu[day]}
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
