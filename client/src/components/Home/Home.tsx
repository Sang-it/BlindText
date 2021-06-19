import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Redirect } from "../shared/Redirect";
import { SidePanel } from "./shared/SidePanel";
import { MessageBox } from "./shared/MessageBox";
import { MainPanel } from "./shared/MainPanel";
import { motion } from "framer-motion";
import { Search } from "./shared/Search";
import { Switch, Route } from "react-router-dom";
import { Random } from "./shared/Random";
import { nanoid } from "nanoid";

type userData = {
  id: string;
  username: string;
};

export const Home: React.FC = () => {
  const [data, setData] = useState<userData | null>(null);
  const [room, setRoom] = useState<string[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:4000/user", {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((info) => setData(info));
    fetch("http://localhost:4000/rooms", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((info) => setRoom(info));
  }, []);

  if (data === null) return <Redirect home={true} />;
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
        justifyContent="center"
        alignItems="space-between"
        backgroundColor="blue.200"
      >
        <SidePanel
          username={data.username}
          refetch={refetch}
          setRefetch={setRefetch}
        />
        <Switch>
          <Route exact path="/home/random">
            <Random setRefetch={setRefetch} />
          </Route>
          <Route exact path="/home/search">
            <Search setRefetch={setRefetch} />
          </Route>
          {room !== null &&
            room.map((ins) => {
              const roomid = data.username
                .concat(ins)
                .split("")
                .sort()
                .join("");
              return (
                <Route key={nanoid()} exact path={`/home/${ins}`}>
                  <MessageBox username={`${data.username}`} room={roomid} />
                </Route>
              );
            })}
          <Route exact path="/home/public">
            <MessageBox username={`${data.username}`} room="public" />
          </Route>
          <Route exact path="/home" component={MainPanel} />
        </Switch>
      </Flex>
    </motion.div>
  );
};
