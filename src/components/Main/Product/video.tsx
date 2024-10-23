import { Box, Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import { IVideo } from "../../types";
import { api } from "../../api/axios";
import { urls } from "../../api/urls";
import "video-react/dist/video-react.css";
import { addStorage, getStorage } from "../../helpers/LocalStorage";

export function VideoSeries() {
  const { videoId, id } = useParams();
  const [data, setData] = useState<IVideo[]>([]);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  setInterval(() => {
    //@ts-ignore
    if (playerRef.current?.getState().player.currentTime) {
      addStorage(
        `time_${videoId}`,
        //@ts-ignore
        playerRef.current?.getState().player.currentTime
      );
    }
  }, 5000);

  useEffect(() => {
    api(urls.product.getOne(id?.split("_")[1]!)).then((res) =>
      setData(res.data?.video)
    );
  }, [videoId, id]);

  if (!data)
    return (
      <Box p="15px">
        <Skeleton h="450px" />
        <Flex alignItems="center" justifyContent="space-between" mt="10px">
          <Skeleton h="40px" w="50px" />
          <Skeleton h="40px" w="50px" />
          <Skeleton h="40px" w="50px" />
        </Flex>
      </Box>
    );

  return (
    <Box p="15px">
      {data.map((el) => {
        if (el.id === Number(videoId?.split("_")[1]))
          return (
            <>
              <Text fontSize="18px" mb="10px" color="white" fontWeight="700">
                {el.title}
              </Text>
              <Player
                ref={playerRef}
                startTime={Number(getStorage(`time_${videoId}`))}
                playsInline
              >
                <source src={el.video} />
              </Player>
              <Flex
                mt="10px"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  color="white"
                  disabled={data[0].id >= el.id}
                  onClick={() =>
                    navigate(
                      `${location.pathname.split("/", 3).join("/")}/${el.title
                        .split(" ")
                        .join("")}_${el.id - 1}`
                    )
                  }
                  variant="outline"
                  gap="10px"
                  _hover={{ bg: "gray" }}
                >
                  <GoArrowLeft />
                  {data[data.length - 1].id >= el.id && data[el?.id - 2]?.title}
                </Button>
                <Button
                  color="white"
                  variant="outline"
                  _hover={{ bg: "gray" }}
                  onClick={() =>
                    navigate(location.pathname.split("/", 3).join("/"))
                  }
                >
                  список всех серий
                </Button>
                <Button
                  color="white"
                  disabled={data[data.length - 1].id <= el.id}
                  onClick={() =>
                    navigate(
                      `${location.pathname.split("/", 3).join("/")}/${el.title
                        .split(" ")
                        .join("")}_${el.id + 1}`
                    )
                  }
                  variant="outline"
                  gap="10px"
                  _hover={{ bg: "gray" }}
                >
                  {data[data.length - 1].id >= el.id && data[el?.id]?.title}
                  <GoArrowRight />
                </Button>
              </Flex>
            </>
          );
      })}
    </Box>
  );
}
