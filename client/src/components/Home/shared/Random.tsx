import { Flex, Heading } from "@chakra-ui/layout";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { SearchResults } from "./SearchResults";

interface IProps {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

type Res = {
  username: string;
};

export const Random: React.FC<IProps> = ({ setRefetch }) => {
  const [data, setData] = useState<Res[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/random", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((info) => setData(info));
  }, []);

  return (
    <Flex
      width="calc(100vw - 18rem)"
      backgroundColor="#36393f"
      padding="2rem"
      direction="column"
      paddingLeft="8rem"
      paddingTop="5rem"
    >
      <Heading fontSize="15px" color="#B9BBBE" pb="2rem">
        Here are some random users from our database.
      </Heading>
      {data.map((user) => (
        <SearchResults
          key={nanoid()}
          title={user.username}
          setRefetch={setRefetch}
        />
      ))}
    </Flex>
  );
};
