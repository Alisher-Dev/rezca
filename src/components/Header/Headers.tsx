import { Box, Text } from "@chakra-ui/react";
import { Search } from "./Search";

function Headers() {
  const section = [
    { id: 1, title: "Новинки" },
    { id: 2, title: "Анонсы" },
    { id: 3, title: "Подборки" },
  ];

  return (
    <>
      <Box
        color="white"
        p="5px 15px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>Logo</Text>
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
        <Box display="flex" w="100%" alignItems="center" gap="10px">
          {section.map((el) => (
            <Text
              fontSize="14px"
              _hover={{ textDecoration: "underline" }}
              cursor="pointer"
              key={el.id}
            >
              {el.title}
            </Text>
          ))}
        </Box>
        <Search />
      </Box>
    </>
  );
}
export { Headers };
