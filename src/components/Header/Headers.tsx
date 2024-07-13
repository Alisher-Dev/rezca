import { Box, Image, Text } from "@chakra-ui/react";
import { Search } from "./Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Headers() {
  const baseUrl = import.meta.env.VITE_BASE_API;
  const [category, setCategory] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios<IProduct[]>({
      url: `${baseUrl}/product`,
      method: "GET",
    }).then((res) => {
      let arr: string[] = [];
      res.data.map((el) => !arr.includes(el.category) && arr.push(el.category));
      setCategory(arr);
    });
  }, []);

  return (
    <>
      <Box
        color="white"
        p="5px 15px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          onClick={() => navigate("/")}
          bg="rgb(100,100,100)"
          p="10px"
          borderRadius="5px"
        >
          <Image
            src="https://pngimg.com/d/letter_r_PNG93944.png"
            alt="error in img"
            w="20px"
            h="20px"
          />
        </Box>
        <Text textTransform="uppercase">rezca</Text>
        <Box display="flex" alignItems="center" gap="10px">
          <Text>login</Text>
        </Box>
      </Box>
      <Box
        color="white"
        display="flex"
        bg="rgb(34,45,50)"
        p="5px 15px"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Box
          display={{ base: "none", md: "flex" }}
          w="100%"
          alignItems="center"
          gap="10px"
        >
          {category.map((el, i) => (
            <Text
              fontSize="14px"
              _hover={{ textDecoration: "underline" }}
              cursor="pointer"
              key={i}
            >
              {el}
            </Text>
          ))}
        </Box>
        <Search />
      </Box>
    </>
  );
}
export { Headers };
