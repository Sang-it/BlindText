import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

interface IProps {
  home?: boolean;
}

export const Redirect: React.FC<IProps> = ({ home }) => {
  const history = useHistory();
  return (
    <motion.div
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
        backgroundColor="#36393f"
        alignItems="center"
        justifyContent="center"
      >
        {home ? (
          <Heading fontSize="2xl" color="white">
            <Link
              onClick={() => {
                history.push("/login");
              }}
              color="blue.300"
            >
              Login
            </Link>{" "}
            to continue...
          </Heading>
        ) : (
          <Heading fontSize="2xl" color="white">
            <Text color="blue.300">Logged in.</Text>
            Redirecting to home...
          </Heading>
        )}
      </Flex>
    </motion.div>
  );
};
