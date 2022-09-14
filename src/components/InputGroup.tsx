import React from "react";
import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface InputGroupProps extends FormControlProps {
  name: string;
  label?: string;
  type?: string;
  validations?: Record<string, unknown>;
}

const InputGroup: React.FC<InputGroupProps> = ({
  name,
  label,
  type = "text",
  defaultValue,
  validations = {},
  ...styles
}) => {
  return (
    <FormControl {...styles}>
      <FormLabel htmlFor={name} id={`${name}-label`}>
        {label || name}
      </FormLabel>
      <Input
        defaultValue={defaultValue}
        type={type}
        id={name}
        name={name}
        aria-labelledby={`${name}-label`}
        {...validations}
      />
    </FormControl>
  );
};

export default InputGroup;
