import { Box, Container, Image } from "@chakra-ui/react";
import { Headers } from "./components/header/Headers";
import "./style/style.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./components/main/Index";
import { ItemProduct } from "./components/main/product/productItem";
import { useEffect } from "react";
import Background from "/demon.jpeg";
import { VideoSeries } from "./components/main/product/video";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <Box bg="black">
      <Image
        src={Background}
        position="absolute"
        h="100vh"
        objectFit="cover"
        zIndex="1"
        w="100%"
      />
      <Box
        w="100%"
        zIndex="1"
        position="absolute"
        h="100vh"
        bgGradient="linear(to-t, rgb(0,0,0), rgba(0,0,0,0))"
      ></Box>
      <Container
        maxW="1000px"
        pt="20px"
        m="0 auto"
        minH="100vh"
        position="relative"
        zIndex="2"
      >
        <Box bg="black" borderRadius="8px">
          <Headers />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/product/:id" element={<ItemProduct />} />
            <Route path="/product/:id/:videoId" element={<VideoSeries />} />
          </Routes>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
