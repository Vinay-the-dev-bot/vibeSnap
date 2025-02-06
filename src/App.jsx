import MainRoutes from "./MainRoute/MainRoutes";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import MenuTab from "./Components/MenuTab";
import SmallProfileCard from "./Components/SmallProfileCard";
import { useLocation } from "react-router-dom";
const App = () => {
  const location = useLocation();
  console.log(
    "location.pathname !== /login",
    location.pathname.toLowerCase(),
    location.pathname.toLowerCase !== "/login"
  );
  return (
    <>
      <ChakraProvider>
        <Flex gap="20px" width="100%">
          {location.pathname.toLowerCase() !== "/login" && (
            <Flex flexDir="column" alignItems="center" w="20%">
              <>
                <SmallProfileCard />
                <MenuTab />
              </>
            </Flex>
          )}
          <MainRoutes />
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default App;
