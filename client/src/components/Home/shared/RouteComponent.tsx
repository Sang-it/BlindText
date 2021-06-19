import { Text } from "@chakra-ui/react";
import { CloseIcon, AtSignIcon, ChatIcon } from "@chakra-ui/icons";

interface IProps {
  title: string;
  type: string;
}

export const RouteComponent: React.FC<IProps> = ({ title, type }) => {
  return (
    <Text
      color="white"
      ml="1rem"
      mb="0.5rem"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      padding="0.4rem 0.6rem"
      transition="all 0.15s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        backgroundColor: "#e6e1e1",
        color: "black",
        borderRadius: "3px",
        cursor: "pointer",
      }}
    >
      {type === "at" && <AtSignIcon mr="0.5rem" />}
      {type === "random" && <CloseIcon mr="0.5rem" />}
      {type === "chat" && <ChatIcon mr="0.5rem" />}
      {title}
    </Text>
  );
};
