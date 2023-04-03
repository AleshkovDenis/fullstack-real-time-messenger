import React from "react";
import { Field, useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

interface Props {
  name: string;
  label: string | undefined;
  autoComplete: string | undefined;
  type: string | undefined;
}

const TextField: React.FC<Props> = ({ label, autoComplete, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input as={Field} autoComplete={autoComplete} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
