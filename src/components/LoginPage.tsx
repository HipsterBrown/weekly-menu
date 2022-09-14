import React from "react";
import { Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { ActionFunction, json, LoaderFunction, redirect } from "react-router";
import { Form } from "react-router-dom";
import { getSession, login } from "../db";
import InputGroup from "./InputGroup";
import { hasStatus } from "../utils";

export const loader: LoaderFunction = async () => {
  try {
    await getSession();
    return redirect("/");
  } catch (error) {
    if (
      error instanceof Response ||
      (hasStatus(error) && error.status === 401)
    ) {
      return json(null);
    }
    throw error;
  }
};

export const action: ActionFunction = async ({ request }) => {
  const { username, password } = Object.fromEntries(await request.formData());
  await login(String(username), String(password));

  return redirect("/");
};

const LoginPage: React.FC = () => {
  return (
    <SimpleGrid spacingY="3" maxWidth="600px" mx="auto" p="3">
      <Heading>Login</Heading>
      <Form method="post">
        <SimpleGrid spacingY="3">
          <InputGroup
            name="username"
            label="Username"
            validations={{ required: true }}
          />
          <InputGroup
            name="password"
            label="Password"
            type="password"
            validations={{ required: true }}
          />
          <Button
            type="submit"
            colorScheme="pink"
            width="100%"
            maxWidth={[null, "10rem"]}
          >
            Login
          </Button>
        </SimpleGrid>
      </Form>
    </SimpleGrid>
  );
};

export default LoginPage;
