import { Flex, Heading, Text } from "@chakra-ui/react";
export const Loading: React.FC = () => {
  return (
    <Flex
      height="100vh"
      backgroundColor="#36393f"
      alignItems="center"
      justifyContent="center"
    >
      <Heading fontSize="2xl" color="white">
        <Text color="blue.300">Loading...</Text>
        Please wait.
      </Heading>
    </Flex>
  );
};
