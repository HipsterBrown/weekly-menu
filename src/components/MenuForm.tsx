import React from "react";
import { Button, SimpleGrid } from "@chakra-ui/react";
import * as Yup from "yup";
import { Form } from "react-router-dom";
import { Menu, DAYS } from "../db";
import InputGroup from "./InputGroup";

const FormSchema = Yup.object(
  DAYS.reduce(
    (result, day) => ({
      ...result,
      [day]: Yup.string().required("This field is required").max(100),
    }),
    {}
  )
);

const MenuForm: React.FC<{
  menu: PouchDB.Core.ExistingDocument<Menu>;
}> = ({ menu }) => {
  console.log({ menu });
  return (
    <Form method="post">
      <SimpleGrid spacingY={3}>
        {DAYS.map((day) => (
          <InputGroup
            key={day}
            name={day}
            mb="2"
            defaultValue={menu[day]}
            validations={{ required: true, maxLength: 100 }}
          />
        ))}
        <input type="hidden" id="_id" name="_id" value={menu._id} />
        <input type="hidden" id="_rev" name="_rev" value={menu._rev} />
        <Button
          type="submit"
          colorScheme="pink"
          width="100%"
          maxWidth={[null, "10rem"]}
          mb="3"
        >
          Save
        </Button>
      </SimpleGrid>
    </Form>
  );
  {
    /* return ( */
  }
  {
    /*   <Formik */
  }
  {
    /*     initialValues={doc} */
  }
  {
    /*     enableReinitialize */
  }
  {
    /*     onSubmit={(values) => onSubmit(values, doc)} */
  }
  {
    /*     validationSchema={FormSchema} */
  }
  {
    /*   > */
  }
  {
    /*     <Form> */
  }
  {
    /*       <SimpleGrid spacingY="3"> */
  }
  {
    /*         {DAYS.map((day) => ( */
  }
  {
    /*           <InputGroup key={day} name={day} mb="2" /> */
  }
  {
    /*         ))} */
  }
  {
    /*         <Button */
  }
  {
    /*           type="submit" */
  }
  {
    /*           colorScheme="pink" */
  }
  {
    /*           width="100%" */
  }
  {
    /*           maxWidth={[null, "10rem"]} */
  }
  {
    /*           mb="3" */
  }
  {
    /*         > */
  }
  {
    /*           Save */
  }
  {
    /*         </Button> */
  }
  {
    /*       </SimpleGrid> */
  }
  {
    /*     </Form> */
  }
  {
    /*   </Formik> */
  }
  // );
};

export default MenuForm;
