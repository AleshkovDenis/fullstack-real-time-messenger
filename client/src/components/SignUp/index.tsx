import React from "react";
import {
  VStack,
  ButtonGroup,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Input,
  Heading,
} from "@chakra-ui/react";
import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";

import { TextField } from "@/components";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("username required!")
          .min(6, "Too short")
          .max(15, "too long"),
        password: Yup.string()
          .required("password required!")
          .min(6, "Too short")
          .max(15, "too long"),
      })}
      onSubmit={(values, actions) => {
        console.log("actions", actions);
        alert(JSON.stringify(values)), actions.resetForm();
      }}
    >
      {(form) => (
        <VStack
          as={Form}
          w={{ base: "90%", md: "500px" }}
          m="auto"
          justify="center"
          h="100vh"
        >
          <Heading>Sign Up</Heading>
          <TextField name="username" label="username" autoComplete="off" />
          <TextField
            name="password"
            label="password"
            type="password"
            autoComplete="off"
          />
          <ButtonGroup>
            <Button colorScheme="teal" type="submit">
              Create Account
            </Button>
            <Button onClick={() => navigate("/signIn")}>
              Already have an account?
            </Button>
          </ButtonGroup>
        </VStack>
      )}
    </Formik>
  );
};

export default SignUp;
