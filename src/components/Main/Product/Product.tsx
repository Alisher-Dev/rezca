import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../types";
import { api } from "../../api/axios";
import { urls } from "../../api/urls";

export function Product() {
  const [data, setData] = useState<IProduct[]>();

  const navigate = useNavigate();

  useEffect(() => {
    api(urls.product.get).then((res) => setData(res.data));
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
    <Grid
      gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
      gap="20px"
    >
      {data?.map((el) => (
        <GridItem key={el.id}>
          <Image
            src={el.image}
            borderRadius="8px"
            objectFit="cover"
            w="100%"
            h="250px"
          />
          <Button
            fontSize="14px"
            fontWeight="500"
            variant="link"
            my="5px"
            color="rgb(61, 153, 182)"
            onClick={() =>
              navigate(`/product/${el.title.split(" ").join("")}_${el.id}`)
            }
          >
            {el.title}
          </Button>
          <Text
            fontSize="14px"
            lineHeight="15px"
            h="30px"
            overflow="hidden"
            color="rgb(139, 169, 179)"
          >
            {el.desc}
          </Text>
        </GridItem>
      ))}
    </Grid>
  );
}
