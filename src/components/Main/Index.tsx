import { Box, Text } from "@chakra-ui/react";
import { Product } from "./Product/Product";

function Main() {
  return (
    <Box color="white" p="5px 15px" minH="80vh">
      <Text p="20px 0" fontWeight="600" fontSize="30px">
        Лучшие фильмы
      </Text>
      <Product />
    </Box>
  );
}

export default Main;
