import React from "react";
import { Flex, Link, Button } from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { Form, Link as RouterLink } from "react-router-dom";

const NavBar: React.FC = () => {
  const session = useLoaderData() as PouchDB.Authentication.UserContext | null;

  return (
    <Flex
      alignItems="center"
      justifyContent="end"
      bg="pink.500"
      minHeight="2rem"
      px="2"
      py="3"
    >
      {session?.name && (
        <Form method="delete" action="/logout">
          <Button type="submit" variant="link" color="white">
            Logout
          </Button>
        </Form>
      )}
      {!session?.name && (
        <Link color="white" to="/login" as={RouterLink}>
          Login
        </Link>
      )}
    </Flex>
  );
};

export default NavBar;
