import { Flex, Grid, Text } from "@chakra-ui/react";
import SuggestionsCard from "../../Components/SuggestionsCard";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const Suggestions = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isLoggedIn) Navigate("/login");
  }, []);
  return (
    <>
      <Flex gap="20px" width="100%" p="20px" flexDirection="column">
        <Text fontSize="24px" fontWeight="800">
          Friend Sugestions :
        </Text>
        <Grid
          gridTemplateColumns="repeat(4,1fr)"
          justifyContent="center"
          gap="20px"
        >
          <SuggestionsCard />
        </Grid>
      </Flex>
    </>
  );
};
export default Suggestions;
