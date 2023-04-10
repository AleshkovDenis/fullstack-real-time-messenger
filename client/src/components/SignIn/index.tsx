import React from "react";
import { VStack, ButtonGroup, Button, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { TextField } from "@/components";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
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
        fetch("http://localhost:3000/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => {
            console.log("res", res);
            return res.json();
          })
          .then((data) => {
            console.log("data", data);
          })
          .catch(() => {
            return;
          });
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
          <Heading>Sign In</Heading>
          <TextField name="username" label="username" autoComplete="off" />
          <TextField
            name="password"
            label="password"
            type="password"
            autoComplete="off"
          />
          <ButtonGroup>
            <Button colorScheme="teal" type="submit">
              Log In
            </Button>
            <Button onClick={() => navigate("/signUp")}>Create Account</Button>
          </ButtonGroup>
        </VStack>
      )}
    </Formik>
  );
};

export default Login;
