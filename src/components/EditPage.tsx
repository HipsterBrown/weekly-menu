import React from "react";
import { Box, Heading, Button, SimpleGrid } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { startOfWeek } from "date-fns";
import { useHistory } from "react-router";
import { DAYS, local, useQueryDB, Menu } from "../db";
import InputGroup from "./InputGroup";

const BLANK_MENU: Menu = {
  M: "",
  T: "",
  W: "",
  Th: "",
  F: "",
  Sa: "",
  Su: ""
};

const FormSchema = Yup.object(
  DAYS.reduce(
    (result, day) => ({
      ...result,
      [day]: Yup.string().required("This field is required").max(100)
    }),
    {}
  )
);

const EditPage: React.FC = () => {
  const history = useHistory();
  const menuDate = startOfWeek(Date.now(), { weekStartsOn: 1 }).toJSON();
  const menu = useQueryDB(menuDate);
  const onSubmit = async (values: Menu) => {
    await local.put({ _id: menuDate, _rev: menu?._rev, ...menu, ...values });
    history.push("/");
  };

  return (
    <Box mx="auto" maxWidth="500px">
      <Heading mt="0" mb="4">
        Edit Weekly Menu
      </Heading>
      <Formik
        initialValues={menu || BLANK_MENU}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={FormSchema}
      >
        <Form>
          <SimpleGrid spacingY="3">
            {DAYS.map(day => (
              <InputGroup key={day} name={day} mb="2" />
            ))}
            <Button
              type="submit"
              variantColor="pink"
              width="100%"
              maxWidth={[null, "10rem"]}
              mb="3"
            >
              Save
            </Button>
          </SimpleGrid>
        </Form>
      </Formik>
    </Box>
  );
};

export default EditPage;
