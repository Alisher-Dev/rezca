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
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "./Product";
import { IProduct, IVideo } from "../../types";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import {
  addStorage,
  getStorage,
  removeStorage,
} from "../../helpers/LocalStorage";

export function ItemProduct() {
  const video_series = getStorage("video_series");
  const [video, setVideo] = useState<IVideo | undefined>();
  const baseUrl = import.meta.env.VITE_BASE_API;
  const [data, setData] = useState<IProduct>();
  const { id } = useParams();

  useEffect(() => {
    if (!!video_series) {
      setVideo(JSON.parse(video_series));
    }
  }, [video_series]);

  function handleVideo(value?: IVideo) {
    if (!!value) {
      addStorage("video_series", JSON.stringify(value));
      setVideo(value);
    } else {
      removeStorage("video_series");
      setVideo(undefined);
    }
  }

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
      p="15px"
      color="white"
      gap="20px"
    >
      <Text fontSize="28px" p="10px 0" fontWeight="700">
        {data?.title}
      </Text>
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
        {!video ? (
          data.video.map((el) => (
            <Button
              onClick={() => handleVideo(el)}
              color="white"
              _hover={{ bg: "rgb(90,90,90)" }}
              variant="outline"
              key={el.id}
            >
              {el.title}
            </Button>
          ))
        ) : (
          <Box>
            <Flex mb="10px" alignItems="center" justifyContent="space-between">
              <Button
                onClick={() => handleVideo()}
                color="white"
                variant="outline"
                _hover={{ bg: "gray" }}
              >
                назад
              </Button>
              <Text fontWeight="500">{video.title}</Text>
            </Flex>
            <Player playsInline>
              <source src={video.video} />
            </Player>
          </Box>
        )}
      </Grid>
      <Box mt="20px">
        <Text fontSize="24px" fontWeight="600">
          Смотреть ещё Anime:
        </Text>
        <Product limit />
      </Box>
    </Box>
  );
}
