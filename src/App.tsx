import { Box, Container, Image } from "@chakra-ui/react";
import { Headers } from "./components/Header/Headers";
import "./style/style.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./components/Main/Index";
import { ItemProduct } from "./components/Main/Product/ItemProduct";
import { useEffect } from "react";
import Background from "/demon.jpeg";

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
          </Routes>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
