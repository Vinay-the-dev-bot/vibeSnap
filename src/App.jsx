import { useNavigate } from "react-router-dom";
import MainRoutes from "./MainRoute/MainRoutes";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) navigate("/login");
  }, []);
  return (
    <>
      <ChakraProvider>
        <MainRoutes />
      </ChakraProvider>
    </>
  );
}

export default App;
