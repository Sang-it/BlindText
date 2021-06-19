import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Redirect } from "../shared/Redirect";
import { CentralDiv } from "./shared/CentralDiv";
import { Loading } from "../shared/Loading";
import { motion } from "framer-motion";

export const Landing: React.FC = () => {
  const [valid, setValid] = useState<boolean | null>(null);
  const history = useHistory();

  useEffect(() => {
    document.title = "BlindText";
    fetch("http://localhost:4000/validateToken", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setValid(true))
      .catch((err) => {
        setValid(false);
      });
  }, []);

  if (valid === null) {
    return <Loading />;
  }

  if (!valid)
    return (
      <motion.div
        exit={{
          x: "100vw",
          transition: {
            type: "crossfade",
            delay: 0,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <Flex
          height="100vh"
          justifyContent="center"
          alignItems="center"
          backgroundImage="url(./KoeNoKatachi.jpeg)"
          backgroundSize="cover"
        >
          <CentralDiv />
        </Flex>
      </motion.div>
    );

  setTimeout(() => {
    history.push("/home");
  }, 1500);

  return <Redirect />;
};
