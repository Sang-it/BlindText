import { useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

export const MainPanel: React.FC = () => {
  useEffect(() => {
    fetch("http://localhost:4000/rooms", {
      method: "POST",
      credentials: "include",
    });
  }, []);

  return (
    <Flex
      width="calc(100vw - 18rem)"
      backgroundColor="#36393f"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Heading color="blue.200" mb="1rem">
        Find yourself.
      </Heading>
      <Text color="white" fontWeight="bold">
        A Community that's based on anonymity.
      </Text>
    </Flex>
  );
};
