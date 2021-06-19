import {
  Popover,
  PopoverTrigger,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  ModalHeader,
  PopoverBody,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface IProps {
  username: string;
}

export const Logout: React.FC<IProps> = ({ username }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = async () => {
    await fetch("http://localhost:4000/logout", {
      credentials: "include",
    });
    window.location.reload();
  };

  return (
    <>
      <Popover placement="right">
        <PopoverTrigger>
          <Text
            ml="1rem"
            color="white"
            mb="1rem"
            padding="0.4rem 0.6rem"
            transition="all 0.15s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
              backgroundColor: "#e6e1e1",
              color: "black",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            {username}
            <ChevronDownIcon />
          </Text>
        </PopoverTrigger>
        <PopoverContent bg="#e6e1e1">
          <PopoverCloseButton />
          <PopoverHeader>Log out?</PopoverHeader>
          <PopoverBody>
            <Button
              onClick={onOpen}
              backgroundColor="red.500"
              color="white"
              _hover={{
                backgroundColor: "red.400",
              }}
            >
              Logout
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={logout}>
              Logout
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
