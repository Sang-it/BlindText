import {
  useToast,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  Spinner,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

type IForm = {
  user: string;
  email: string;
  pass: string;
  spinner: boolean;
};

export const RegisterForm: React.FC = () => {
  const toast = useToast();
  const history = useHistory();
  const [form, setForm] = useState<IForm>({
    user: "",
    email: "",
    pass: "",
    spinner: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //@ts-expect-error
    form[name] = value;
    setForm({ ...form });
  };

  const hanldeRegister = async () => {
    if (form.user !== "" && form.email !== "" && form.pass !== "") {
      try {
        const res = await fetch("http://localhost:4000/registerUser", {
          method: "POST",
          body: JSON.stringify({
            username: `${form.user}`,
            email: `${form.email}`,
            password: `${form.pass}`,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        const { title, description, status } = data;
        toast({
          title: title,
          description: description,
          status: status,
          isClosable: true,
          position: "top",
          duration: 2000,
        });
        form["spinner"] = false;
        setForm({ ...form });
        if (title === "Account created.") {
          setTimeout(() => {
            history.push("/login");
          }, 1500);
        }
      } catch {
        toast({
          title: "Cannot connect to server.",
          description: "Try again later.",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 2000,
        });
        form["spinner"] = false;
        setForm({ ...form });
      }
    } else {
      toast({
        title: "Fields can't be blank.",
        isClosable: true,
        status: "error",
        position: "top",
        duration: 2000,
      });
    }
    form["spinner"] = false;
    setForm({ ...form });
  };

  return (
    <motion.div
      initial={{ x: "-200vh" }}
      animate={{
        x: 0,
        transition: {
          delay: 0,
          duration: 1,
          ease: "easeInOut",
        },
      }}
    >
      <Flex
        backgroundColor="#36393f"
        height={["100vh", "100vh", "35rem"]}
        width="25rem"
        direction="column"
        padding="2rem"
        borderRadius={["none", "none", "5px"]}
      >
        <Heading alignSelf="center" fontSize="2xl" color="white" mb="0.8rem">
          Create An Account
        </Heading>
        <Text mb="0.8rem" color="#B9BBBE" fontSize="0.8rem" fontWeight="750">
          EMAIL
        </Text>
        <Input
          type="email"
          border="none"
          name="email"
          value={form.email}
          textTransform="lowercase"
          borderRadius="3px"
          background="#2c2f34"
          color="white"
          mb="2rem"
          onChange={handleChange}
        />
        <Text mb="0.8rem" color="#B9BBBE" fontSize="0.8rem" fontWeight="750">
          USERNAME
        </Text>
        <Input
          border="none"
          borderRadius="3px"
          value={form.user}
          name="user"
          color="white"
          background="#2c2f34"
          textTransform="lowercase"
          mb="2rem"
          type="text"
          onChange={handleChange}
        />
        <Text mb="0.8rem" color="#B9BBBE" fontSize="0.8rem" fontWeight="750">
          PASSWORD
        </Text>
        <Input
          border="none"
          borderRadius="3px"
          name="pass"
          value={form.pass}
          color="white"
          background="#2c2f34"
          mb="2rem"
          type="password"
          onKeyPress={(e) => {
            if (e.key === "Enter") hanldeRegister();
          }}
          onChange={handleChange}
        />
        <Button
          mb="1rem"
          backgroundColor="#7289da"
          _hover={{
            backgroundColor: "#5f7ad8",
          }}
          onClick={() => {
            form["spinner"] = true;
            setForm({ ...form });
            hanldeRegister();
          }}
        >
          {form.spinner ? <Spinner /> : "Register"}
        </Button>
        <Link
          color="#00b0f4"
          fontWeight="350"
          onClick={() => history.push("/login")}
        >
          Already have an account?
        </Link>
        <Text color="#B9BBBE">
          By registering you agree to{" "}
          <Link color="#00b0f4">Term's of Service</Link> and{" "}
          <Link color="#00b0f4">Privacy Policy</Link>
        </Text>
      </Flex>
    </motion.div>
  );
};
