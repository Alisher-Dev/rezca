import { Box, Container } from "@chakra-ui/react";
import { Headers } from "./components/Header/Headers";
import "./style/style.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./components/Main/Index";
import { DynamicProduct } from "./components/Main/Product/DynamicProduct";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <Box bg="black" p="200px 0 0">
      <Container maxW="1000px" m="0 auto">
        <Box bg="rgb(9,22,28)">
          <Headers />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/product/:id" element={<DynamicProduct />} />
          </Routes>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
