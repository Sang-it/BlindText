import { Flex, Divider, Text } from "@chakra-ui/react";

interface IProps {
  username: string;
  content: string;
}

export const Message: React.FC<IProps> = ({ username, content }) => {
  return (
    <Flex
      width="100%"
      direction="column"
      borderRadius="5px"
      padding="0.3rem 0.7rem"
      color="white"
      marginBottom="1rem"
    >
      <Text fontWeight="bold" color="blue.300">
        {username}
      </Text>
      <Divider border="none" margin="0.2rem 0" />
      <Text>{content}</Text>
    </Flex>
  );
};
