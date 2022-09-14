import React from "react";
import { Button, SimpleGrid } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { Menu, DAYS } from "../db";
import InputGroup from "./InputGroup";

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
};

export default MenuForm;
