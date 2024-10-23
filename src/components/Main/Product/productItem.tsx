import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../types";
import { api } from "../../api/axios";
import { urls } from "../../api/urls";

export function ItemProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<IProduct>();
  const { id } = useParams();

  useEffect(() => {
    api(urls.product.getOne(id?.split("_")[1]!)).then((res) =>
      setData(res.data)
    );
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
      p="15px"
      color="white"
      gap="20px"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="28px" p="10px 0" fontWeight="700">
          {data?.title}
        </Text>
      </Flex>

      <Flex>
        <Image
          src={data?.image}
          w="200px"
          h="300px"
          borderRadius="5px"
          alt="error in img"
        />
        <Box p="0 0 0 20px">
          <Text display="block">
            <Box as="span" fontWeight="500">
              описание:{" "}
            </Box>
            {data?.desc}
          </Text>
          <Text display="block">
            <Box as="span" fontWeight="500">
              дата:{" "}
            </Box>
            {new Date(Number(data.date)).toLocaleDateString()}
          </Text>
          <Box mt="20px">
            <Text fontSize="18px" fontWeight="600">
              Про что Anime: {data?.title}
            </Text>
            <Text fontSize="16px">{data?.desc}</Text>
          </Box>
        </Box>
      </Flex>
      <Grid
        mt="20px"
        w="100%"
        gap="3"
        gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
      >
        {data.video?.map((el) => (
          <Button
            onClick={() =>
              navigate(
                `${location.pathname}/${el.title.split(" ").join("")}_${el.id}`
              )
            }
            color="white"
            _hover={{ bg: "rgb(90,90,90)" }}
            variant="outline"
            key={el.id}
          >
            {el.title}
          </Button>
        ))}
      </Grid>
    </Box>
  );
}
