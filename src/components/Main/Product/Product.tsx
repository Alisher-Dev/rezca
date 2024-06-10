import {
  Box,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
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

interface TypeLimit {
  limit?: boolean;
}

function Product(props: TypeLimit) {
  const baseUrl = import.meta.env.VITE_BASE_API;
  const [data, setData] = useState<TypeProduct[]>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseUrl}/product`)
      .then((res) => setData(res?.data))
      .catch((e) => console.log(e));
  }, []);

  if (!data) {
    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        color="white"
        gap="20px"
        p="5px 15px"
        justifyContent="space-between"
      >
        <Skeleton h="300px"></Skeleton>
        <Skeleton h="300px"></Skeleton>
        <Skeleton h="300px"></Skeleton>
        <Skeleton h="300px"></Skeleton>
        <Skeleton h="300px"></Skeleton>
        <Skeleton h="300px"></Skeleton>
        <Skeleton h="300px"></Skeleton>
        <Skeleton h="300px"></Skeleton>
        <Skeleton h="300px"></Skeleton>
        <Skeleton h="300px"></Skeleton>
      </Box>
    );
  }

  return (
    <Grid gridTemplateColumns="repeat(5, 1fr)" gap="20px">
      {!props.limit
        ? data?.map((el) => (
            <GridItem onClick={() => navigate(`/product/${el.id}`)} key={el.id}>
              <Image src={el.image} objectFit="cover" w="170px" h="250px" />
              <Box>
                <Text
                  fontSize="16px"
                  lineHeight="24px"
                  fontWeight="500"
                  h="50px"
                  w="170px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  color="rgb(61, 153, 182)"
                >
                  {el.title}
                </Text>
                <Text
                  fontSize="12px"
                  lineHeight="14px"
                  h="30px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  color="rgb(49, 73, 80)"
                >
                  {el.desc}
                </Text>
              </Box>
            </GridItem>
          ))
        : data?.slice(0, 5).map((el) => (
            <GridItem onClick={() => navigate(`/product/${el.id}`)} key={el.id}>
              <Image src={el.image} objectFit="cover" w="170px" h="250px" />
              <Box>
                <Text
                  fontSize="16px"
                  lineHeight="24px"
                  fontWeight="500"
                  h="50px"
                  w="170px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  color="rgb(61, 153, 182)"
                >
                  {el.title}
                </Text>
                <Text
                  fontSize="12px"
                  lineHeight="14px"
                  h="30px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  color="rgb(49, 73, 80)"
                >
                  {el.desc}
                </Text>
              </Box>
            </GridItem>
          ))}
    </Grid>
  );
}

export { Product };
