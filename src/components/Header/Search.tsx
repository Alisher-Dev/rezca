import { Box, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TypeProduct {
  id: number;
  title: string;
  desc: string;
  date: Date;
  image: string;
}

function Search() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_API;
  const [data, setData] = useState<TypeProduct[]>([]);
  const [search, setSearch] = useState<TypeProduct[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/product`)
      .then((res) => setData(res?.data))
      .catch((e) => console.log(e));
  }, []);

  function handlerSearch(value: string) {
    setInput(value);
    setSearch(
      data.filter((el) => {
        return el.title
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim());
      })
    );
  }

  return (
    <Flex position="relative" w="100%" justifyContent="flex-end">
      <Input
        onChange={(e) => handlerSearch(e.target.value)}
        _focus={{ maxW: { base: "100%", md: "600px" } }}
        maxW="200px"
        value={input}
        placeholder="search.."
        transition="all .3s linear"
        variant="flushed"
      />
      <Box
        position="absolute"
        bottom="0"
        right="0"
        w="100%"
        bg="rgb(9,22,28)"
        transform="translate(0, 100%)"
        transition="all .5s ease"
        overflow="auto"
        h={search.length && input ? "fit-content" : "0px"}
      >
        {search.map((el) => (
          <Box
            as="button"
            borderBottom="1px solid gray"
            p="5px"
            w="100%"
            textAlign="start"
            onClick={() => [navigate(`/product/${el.id}`), setInput("")]}
          >
            {el.title}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

export { Search };
