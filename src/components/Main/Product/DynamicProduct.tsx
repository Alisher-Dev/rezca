import { Box, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "./Product";

interface TypeProduct {
  id: number;
  title: string;
  desc: string;
  date: number;
  image: string;
}

function DynamicProduct() {
  const baseUrl = import.meta.env.VITE_BASE_API;
  const [data, setData] = useState<TypeProduct>();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${baseUrl}/product/${id}`)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, [id]);

  if (!data) {
    return (
      <Box minH="80vh" p="5px 15px">
        <Box
          display="flex"
          gridTemplateColumns="repeat(5, 1fr)"
          color="white"
          gap="20px"
          p="5px 15px"
        >
          <Box w="200px">
            <Skeleton h="300px"></Skeleton>
          </Box>
          <Box w="100%" h="200px">
            <Stack>
              <Skeleton mb="20px" height="20px" />
              <Skeleton mb="20px" height="20px" />
              <Skeleton mb="20px" height="20px" />
              <Skeleton mb="20px" height="20px" />
              <Skeleton mb="20px" height="20px" />
            </Stack>
          </Box>
        </Box>
        <Box w="100%" mt="30px">
          <Stack>
            <Skeleton mb="20px" height="20px" />
            <Skeleton mb="20px" height="20px" />
            <Skeleton mb="20px" height="20px" />
            <Skeleton mb="20px" height="20px" />
            <Skeleton mb="20px" height="20px" />
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      minH="80vh"
      gridTemplateColumns="repeat(5, 1fr)"
      p="5px 15px"
      color="white"
      gap="20px"
    >
      <Text fontSize="28px" p="10px 0" fontWeight="700">
        {data?.title}
      </Text>
      <Box display="flex">
        <Image
          src={data?.image}
          w="200px"
          h="300px"
          borderRadius="5px"
          alt="error in img"
        />
        <Box p="0 0 0 20px">
          <Text display="block">
            <Box as="span" style={{ fontWeight: "500" }}>
              description:{" "}
            </Box>
            {data?.desc}
          </Text>
          <Text display="block">
            <Box as="span" style={{ fontWeight: "500" }}>
              date:{" "}
            </Box>
            {new Date(Number(data.date)).getDay() as any}.
            {new Date(Number(data.date)).getMonth() as any}.
            {new Date(Number(data.date)).getFullYear() as any}
          </Text>
        </Box>
      </Box>
      <Box mt="20px">
        <Text fontSize="24px" fontWeight="600">
          Про что фильм : {data?.title}
        </Text>
        <Text fontSize="13px">{data?.desc}</Text>
      </Box>
      <Box mt="20px">
        <Text fontSize="24px" fontWeight="600">
          Смотреть ещё фильмы:
        </Text>
        <Product limit />
      </Box>
    </Box>
  );
}

export { DynamicProduct };
