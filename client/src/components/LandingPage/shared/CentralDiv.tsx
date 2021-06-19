import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useHistory } from "react-router";

export const CentralDiv: React.FC = () => {
  const history = useHistory();
  return (
    <Flex
      alignItems="center"
      backgroundColor="#36393f"
      direction="column"
      height={["100vh", "100vh", "35rem"]}
      borderRadius={["none", "none", "5px"]}
      padding="3rem"
      width="25rem"
    >
      <Heading alignSelf="flex-start" color="white" mb="1rem" fontSize="2xl">
        A Place for Anonymity.
      </Heading>
      <Text alignSelf="flex-start" color="#B9BBBE">
        Find a random person registered in our database and start chatting. Only
        usernames are shown. No photos to judge, no gender to look for. Have a
        chat and see what you have in common with the other person.
      </Text>
      <Heading
        margin=" 1rem 0"
        alignSelf="flex-start"
        color="white"
        fontSize="2xl"
      >
        Find your people
      </Heading>
      <Text mb="2rem" alignSelf="flex-start" color="#B9BBBE">
        Without being judged.
      </Text>
      <Button
        backgroundColor="#7289da"
        _hover={{
          backgroundColor: "#5f7ad8",
        }}
        alignSelf="stretch"
        onClick={() => history.push("/login")}
      >
        Login
      </Button>
      <Text m="1rem 0" color="#B9BBBE">
        Or
      </Text>
      <Button
        backgroundColor="#7289da"
        _hover={{
          backgroundColor: "#5f7ad8",
        }}
        alignSelf="stretch"
        onClick={() => history.push("/register")}
      >
        Register
      </Button>
    </Flex>
  );
};
