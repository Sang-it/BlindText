import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { Flex, Input } from "@chakra-ui/react";
import { Message } from "./Message";
import { nanoid } from "nanoid";

type TMessage = {
  username: string;
  content: string;
};

interface IProps {
  username: string;
  room: string;
}

export const MessageBox: React.FC<IProps> = ({ username, room }) => {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<TMessage[]>([]);
  const divel = useRef<HTMLDivElement>(null);

  const socket = io("http://localhost:4000/", {
    query: {
      username: `${username}`,
    },
  });

  const fetchMessages = async () => {
    await fetch("http://localhost:4000/message", {
      method: "POST",
      body: JSON.stringify({
        room,
      }),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((info: TMessage[]) => setData(info));
  };

  useEffect(() => {
    fetchMessages();
    socket.emit("joinRoom", room);

    socket.on("receive", (user, message) => {
      fetchMessages();
      data.push({ username: `${user}`, content: `${message}` });
      setData([...data]);

      divel.current?.scroll({
        top: divel.current?.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  const handleSend = () => {
    socket.emit("send", `${value}`, room);

    divel.current?.scroll({
      top: divel.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Flex
      width="calc(100vw - 18rem)"
      backgroundColor="#36393f"
      padding="0 8rem"
      direction="column"
      paddingTop="1.8rem"
    >
      <Flex
        direction="column"
        border="1px solid rgb(34,87,160)"
        borderRadius="5px"
        mb="2rem"
      >
        <div className="container" ref={divel}>
          {data.map((mess) => (
            <Message
              key={nanoid()}
              username={mess.username}
              content={mess.content}
            />
          ))}
        </div>
      </Flex>
      <Input
        color="white"
        value={value}
        borderColor="blue.600"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
        }}
        backgroundColor="#2c2f34"
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (value !== "" && e.key === "Enter") {
            handleSend();
            setValue("");
          }
        }}
      />
    </Flex>
  );
};
