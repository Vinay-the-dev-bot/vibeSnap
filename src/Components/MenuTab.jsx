import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const MenuTab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItem = [
    { menu: "Home", route: "/" },
    // { menu: "Login", route: "/login" },
    { menu: "Profile", route: "/profile" },
    { menu: "Suggestions", route: "/suggestions" }
  ];

  const MenuList = ({ menu }) => (
    <Flex
      width="100%"
      //   ml={`${location.pathname === menu.route ? "5px" : "0"}`}
      padding="5px 30px 5px 10px"
      gap="5px"
      borderRadius="5px"
      boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      onClick={() => navigate(menu.route)}
      cursor="pointer"
    >
      {location.pathname === menu.route && (
        <Box backgroundColor="green" width="5px" h="100%"></Box>
      )}
      <Text>{menu.menu}</Text>
    </Flex>
  );
  return (
    <Flex
      minWidth="175px"
      maxWidth="175px"
      padding="5px"
      flexDirection="column"
    >
      {menuItem.map((menu) => (
        <MenuList key={menu.menu} menu={menu} />
      ))}
      <Button
        mt="30px"
        colorScheme="red"
        onClick={() => {
          localStorage.setItem("isVibeSnapLoggedIn", false);
          dispatch({ type: "LOGOUT" });
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </Flex>
  );
};
export default MenuTab;
