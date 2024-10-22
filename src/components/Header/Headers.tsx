import { Box, Image, Text } from "@chakra-ui/react";
import { Search } from "./Search";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../types";

function Headers() {
  const baseUrl = import.meta.env.VITE_BASE_API;
  const navigate = useNavigate();

  useEffect(() => {
    axios<IProduct[]>({
      url: `${baseUrl}/product`,
      method: "GET",
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
            cursor="pointer"
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
        <Search />
      </Box>
    </>
  );
}
export { Headers };
