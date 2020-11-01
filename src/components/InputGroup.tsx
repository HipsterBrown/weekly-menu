import React from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/core";
import { useField, ErrorMessage } from "formik";

interface InputGroupProps extends FormControlProps {
  name: string;
  label?: string;
  type?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  name,
  label,
  type = "text",
  ...styles
}) => {
  const [field, { error, touched }] = useField({ name, type });

  return (
    <FormControl isInvalid={!!error && touched} {...styles}>
      <FormLabel htmlFor={name} id={`${name}-label`}>
        {label || name}
      </FormLabel>
      <Input
        {...field}
        type={type}
        id={name}
        aria-labelledby={`${name}-label`}
      />
      <ErrorMessage component={FormErrorMessage} name={name} />
    </FormControl>
  );
};

export default InputGroup;
