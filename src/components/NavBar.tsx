import React from "react";
import { Flex, Link, Button, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { useSession } from "../db";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { loading, logout, session } = useSession();

  const logoutWithRedirect = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="end"
      bg="pink.500"
      minHeight="2rem"
      px="2"
      py="3"
    >
      {loading && <Spinner size="md" />}
      {session?.name && (
        <Button onClick={logoutWithRedirect} variant="link" color="white">
          Logout
        </Button>
      )}
      {!loading && !session?.name && (
        <Link color="white" to="/login" as={RouterLink}>
          Login
        </Link>
      )}
    </Flex>
  );
};

export default NavBar;
