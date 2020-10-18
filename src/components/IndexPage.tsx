import React from "react";
import {
  Heading,
  List,
  ListItem,
  Grid,
  Text,
  Link,
  SimpleGrid,
  Skeleton
} from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { format, startOfWeek } from "date-fns";
import { DAYS, useQueryDB, useSession } from "../db";

const IndexPage: React.FC = () => {
  const menuDate = startOfWeek(Date.now(), { weekStartsOn: 1 });
  const currentWeek = format(menuDate, "MMM do");
  const menu = useQueryDB(menuDate.toJSON());
  const { loading, session } = useSession();

  return (
    <>
      <Heading mt="0" mb="4">
        Weekly Menu - {currentWeek}
      </Heading>
      {loading && (
        <SimpleGrid spacingY="3" maxWidth="300px">
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
        </SimpleGrid>
      )}
      {session?.name ? (
        <>
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
          <Link color="teal.500" as={RouterLink} to="/edit" pb="4">
            Edit
          </Link>
        </>
      ) : (
        loading || (
          <Link color="teal.500" as={RouterLink} to="/login">
            Login
          </Link>
        )
      )}
    </>
  );
};

export default IndexPage;
