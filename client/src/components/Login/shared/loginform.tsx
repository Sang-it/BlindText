import React, { useState } from "react";
import {
  useToast,
  Flex,
  Heading,
  Text,
  Spinner,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

interface IForm {
  email: string;
  password: string;
  spinner: boolean;
}

export const LoginForm: React.FC = () => {
  const toast = useToast();
  const history = useHistory();
  const [form, setForm] = useState<IForm>({
    email: "",
    password: "",
    spinner: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //@ts-ignore
    form[name] = value;
    setForm({ ...form });
  };

  const hanldeLogin = async () => {
    if (form.email !== "" && form.password !== "") {
      try {
        const res = await fetch("http://localhost:4000/login", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: `${form.email}`,
            password: `${form.password}`,
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
          position: "top",
          isClosable: true,
          duration: 2000,
        });
        form["spinner"] = false;
        setForm({ ...form });
        if (title === "Login successful.") {
          setTimeout(() => {
            history.push("/home");
          }, 1500);
        }
      } catch {
        toast({
          title: "Cannot connect to server.",
          description: "Try again later.",
          position: "top",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
        form["spinner"] = false;
        setForm({ ...form });
      }
    } else {
      form["spinner"] = false;
      setForm({ ...form });
      toast({
        title: "Fields can't be blank.",
        description: "Try registering an account",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 2000,
      });
    }
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
        backgroundColor="rgb(54, 57, 63)"
        height={["100vh", "100vh", "35rem"]}
        width="25rem"
        direction="column"
        padding="2rem"
        borderRadius={["none", "none", "5px"]}
      >
        <Heading fontSize="2xl" color="white" mb="0.8rem">
          Welcome back!
        </Heading>
        <Text color="#B9BBBE" mb="0.8rem">
          We're so excited to see you again!
        </Text>
        <Text mb="0.8rem" color="#B9BBBE" fontSize="0.8rem" fontWeight="750">
          EMAIL
        </Text>
        <Input
          type="email"
          name="email"
          value={form.email}
          border="none"
          borderRadius="3px"
          background="#2c2f34"
          color="white"
          mb="2rem"
          onChange={handleChange}
        />
        <Text mb="0.8rem" color="#B9BBBE" fontSize="0.8rem" fontWeight="750">
          PASSWORD
        </Text>
        <Input
          border="none"
          borderRadius="3px"
          value={form.password}
          color="white"
          name="password"
          background="#2c2f34"
          mb="2rem"
          type="password"
          onKeyPress={(e) => {
            if (e.key === "Enter") hanldeLogin();
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
            hanldeLogin();
          }}
        >
          {form.spinner ? <Spinner /> : "Login"}
        </Button>
        <Text color="#72767D" mb="1rem">
          Need an account?{" "}
          <Link
            color="#00b0f4"
            fontWeight="350"
            onClick={() => history.push("/register")}
          >
            Register
          </Link>
        </Text>
        <Text color="#72767D">Give us your feedback.</Text>
        <Link color="#00b0f4" fontWeight="350" href="mailto:rux12@icloud.com">
          Here.
        </Link>
      </Flex>
    </motion.div>
  );
};
