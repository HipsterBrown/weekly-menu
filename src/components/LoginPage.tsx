import React, { useEffect } from "react";
import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { useSession } from "../db";
import InputGroup from "./InputGroup";

type LoginValues = {
  username: string;
  password: string;
};

const LoginSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required()
});

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { session, loading, login } = useSession();

  const loginAndGoHome = async ({ username, password }: LoginValues) => {
    await login(username, password);
  };

  useEffect(() => {
    if (session?.name) history.push("/");
  }, [session?.name]);

  return (
    <SimpleGrid spacingY="3" maxWidth="600px" mx="auto" p="3">
      <Heading>Login</Heading>
      {session?.name ? (
        <>
          <Text as="p">Welcome {session.name}</Text>
          <Text as="p">Redirecting to home...</Text>
        </>
      ) : (
          <Formik<LoginValues>
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={loginAndGoHome}
          >
            <Form>
              <SimpleGrid spacingY="3">
                <InputGroup name="username" label="Username" />
                <InputGroup name="password" label="Password" type="password" />
                <Button
                  type="submit"
                  variantColor="pink"
                  width="100%"
                  maxWidth={[null, "10rem"]}
                  isDisabled={loading}
                  isLoading={loading}
                >
                  Save
              </Button>
              </SimpleGrid>
            </Form>
          </Formik>
        )}
    </SimpleGrid>
  );
};

export default LoginPage;
