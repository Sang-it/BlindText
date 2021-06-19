import { Flex, Heading, Text } from "@chakra-ui/react";
import { RouteComponent } from "./RouteComponent";
import { NavLink } from "react-router-dom";
import { Logout } from "./Logout";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

interface IProps {
  username: string;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidePanel: React.FC<IProps> = ({
  username,
  refetch,
  setRefetch,
}) => {
  const [room, setRoom] = useState<string[]>([]);

  const styles = {
    marginLeft: "2rem",
  };

  const fetchRooms = () => {
    fetch("http://localhost:4000/rooms", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setRoom(data));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (refetch) {
    fetchRooms();
    setRefetch(false);
  }

  return (
    <Flex
      height="100vh"
      minWidth="18rem"
      backgroundColor="#2c2f34"
      padding="1rem 2rem"
      direction="column"
    >
      <Heading
        fontSize="2xl"
        color="white"
        display="flex"
        alignSelf="flex-start"
        mb="1.5rem"
      >
        Blind<Text color="blue.200">Text</Text>
      </Heading>
      <Logout username={username} />
      <Heading color="#B9BBBE" fontSize="15px" mb="1rem">
        Search by:
      </Heading>
      <NavLink to="/home/search" activeStyle={styles}>
        <RouteComponent title="Username" type="at" />
      </NavLink>
      <NavLink to="/home/random" activeStyle={styles}>
        <RouteComponent title="Random" type="random" />
      </NavLink>
      <Heading mb="1rem" fontSize="15px" color="#B9BBBE">
        Public Chat
      </Heading>
      <NavLink to="/home/public" activeStyle={styles}>
        <RouteComponent title="Public" type="chat" />
      </NavLink>
      <Heading mb="1rem" fontSize="15px" color="#B9BBBE">
        Direct Messages
      </Heading>
      {room !== null &&
        room.map((chat) => (
          <NavLink key={nanoid()} to={`/home/${chat}`} activeStyle={styles}>
            <RouteComponent title={chat} type="chat" />
          </NavLink>
        ))}
    </Flex>
  );
};
