import { useEffect, useState } from "react";
import { LoginForm } from "./shared/loginform";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { Flex } from "@chakra-ui/layout";
import { Redirect } from "../shared/Redirect";

export const Login = () => {
  const history = useHistory();
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Login";
    fetch("http://localhost:4000/validateToken", {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setValid(true));
  }, []);

  if (!valid)
    return (
      <motion.div
        initial={{ x: "-200vh" }}
        animate={{
          x: 0,
          transition: {
            delay: 0.3,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        exit={{
          x: "100vw",
          transition: {
            delay: 0,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <Flex
          height="100vh"
          alignItems="center"
          justifyContent="center"
          backgroundImage="url(./PageBg.jpeg)"
          backgroundSize="cover"
          backgroundAttachment="fixed"
        >
          <LoginForm />
        </Flex>
      </motion.div>
    );

  setTimeout(() => {
    history.push("/home");
  }, 1500);

  return <Redirect />;
};
