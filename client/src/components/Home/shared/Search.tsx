import React, { useState } from "react";
import {
  Flex,
  Spinner,
  useToast,
  Input,
  Heading,
  Button,
  Box,
} from "@chakra-ui/react";
import { SearchResults } from "./SearchResults";
import { nanoid } from "nanoid";

interface IProps {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

type Res = {
  username: string;
  id: string;
};

export const Search: React.FC<IProps> = ({ setRefetch }) => {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<Res[]>([]);
  const [spinner, setSpinner] = useState<boolean>(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setSpinner(true);
    if (value !== "")
      try {
        const res = await fetch("http://localhost:4000/search", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            value,
          }),
          headers: {
            "content-type": "application/json",
          },
        });
        const info = await res.json();
        setData(info);
        setSpinner(false);
      } catch (err) {
        console.log(err);
        setSpinner(false);
      }
    else {
      setSpinner(false);
      toast({
        title: "Field can't be black",
        status: "error",
        position: "top",
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <Flex
      width="calc(100vw - 18rem)"
      backgroundColor="#36393f"
      padding="2rem"
      direction="column"
      paddingLeft="8rem"
      paddingTop="5rem"
    >
      <Heading fontSize="17px" color="#B9BBBE" mb="1rem">
        Enter a username here.
      </Heading>
      <Flex mb="1rem">
        <Input
          value={value}
          color="white"
          width="30rem"
          border="none"
          backgroundColor="#2c2f34"
          mr="1rem"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Button onClick={handleSubmit} width="6rem">
          {spinner ? <Spinner /> : "Search"}
        </Button>
      </Flex>
      <Box>
        {data.length > 0 &&
          data.map((user) => (
            <SearchResults
              key={nanoid()}
              title={user.username}
              setRefetch={setRefetch}
            />
          ))}
      </Box>
    </Flex>
  );
};
