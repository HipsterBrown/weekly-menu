import React from "react";
import { Heading, List, ListItem, Grid, Text, Link } from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { format, startOfWeek } from "date-fns";
import { DAYS, useQueryDB } from "../db";

const IndexPage: React.FC = () => {
  const menuDate = startOfWeek(Date.now(), { weekStartsOn: 1 });
  const currentWeek = format(menuDate, "MMM do");
  const menu = useQueryDB(menuDate.toJSON());

  return (
    <>
      <Heading mt="0" mb="4">
        Weekly Menu - {currentWeek}
      </Heading>
      <List spacing="4" px="0" mb="3">
        {menu &&
          DAYS.map(day => (
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
      <Link color="teal.500" as={RouterLink} to="/edit">
        Edit
      </Link>
    </>
  );
};

export default IndexPage;
