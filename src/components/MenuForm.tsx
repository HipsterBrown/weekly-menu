import React from "react";
import { Button, SimpleGrid } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Menu, MenuResource, DAYS } from "../db";
import InputGroup from "./InputGroup";

const FormSchema = Yup.object(
  DAYS.reduce(
    (result, day) => ({
      ...result,
      [day]: Yup.string().required("This field is required").max(100)
    }),
    {}
  )
);

const MenuForm: React.FC<{
  menu: MenuResource;
  onSubmit: (values: Menu, doc: ReturnType<MenuResource["read"]>) => void;
}> = ({ menu, onSubmit }) => {
  const doc = menu.read();

  return (
    <Formik
      initialValues={doc}
      enableReinitialize
      onSubmit={values => onSubmit(values, doc)}
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
  );
};

export default MenuForm;
