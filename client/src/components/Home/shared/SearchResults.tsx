import { Heading } from "@chakra-ui/layout";

interface IProps {
  title: string;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchResults: React.FC<IProps> = ({ title, setRefetch }) => {
  const handleClick = async () => {
    await fetch("http://localhost:4000/addRoom", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ title: title }),
      headers: {
        "content-type": "application/json",
      },
    });
    setRefetch(true);
  };

  return (
    <Heading
      ml="0.5rem"
      mb="1rem"
      color="#B9BBBE"
      fontSize="1xl"
      _hover={{
        textDecoration: "underline",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {`@${title}`}
    </Heading>
  );
};
