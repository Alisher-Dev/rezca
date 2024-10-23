import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { urls } from "../api/urls";

interface TypeProduct {
  id: number;
  title: string;
  desc: string;
  date: Date;
  image: string;
}

export function Search() {
  const navigate = useNavigate();
  const [data, setData] = useState<TypeProduct[]>([]);
  const [search, setSearch] = useState<TypeProduct[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    api(urls.product.get).then((res) => setData(res.data));
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
        _focus={{ maxW: { base: "100%", md: "100%" } }}
        maxW="200px"
        value={input}
        placeholder="поиск..."
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
          <Flex
            gap="10px"
            key={el.id}
            as="button"
            borderBottom="1px solid gray"
            p="5px"
            w="100%"
            textAlign="start"
            transition="all .2s"
            _hover={{ bg: "rgb(40,40,40)" }}
            onClick={() => [navigate(`/product/${el.id}`), setInput("")]}
          >
            <Image
              src={el.image}
              w="60px"
              h="60px"
              objectFit="cover"
              borderRadius="10%"
            />
            <Flex
              justifyContent="center"
              flexDirection="column"
              as="span"
              h="60px"
            >
              <Text>{el.title}</Text>
              <Text fontSize="13px" h="20px" maxW="500px" overflow="hidden">
                {el.desc}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
}
