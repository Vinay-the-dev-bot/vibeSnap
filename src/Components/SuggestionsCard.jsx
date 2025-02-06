import { Flex, Image, Text, Box, Button } from "@chakra-ui/react";
import feedCreatorIcon from "../assets/feedCreatorIcon.png";
import feedCreatorIcon2 from "../assets/feedCreatorIcon2.png";
import { useDispatch, useSelector } from "react-redux";
const SuggestionsCard = () => {
  const dispatch = useDispatch();
  const { profileImage } = useSelector((state) => state.user);
  const { friendSuggestions } = useSelector((state) => state.app);
  const images = {
    feedCreatorIcon,
    feedCreatorIcon2,
    profileImage
  };
  const modifyFriend = (index) => {
    const updatedFriends = friendSuggestions.map((fr, i) =>
      i === index
        ? {
            ...fr,
            status:
              fr.status === "not"
                ? "sent"
                : fr.status === "sent"
                ? "friend"
                : "friend"
          }
        : fr
    );
    dispatch({ type: "SUGGESTIONS", payload: updatedFriends });
  };
  return (
    <>
      {friendSuggestions && friendSuggestions.length > 0 ? (
        friendSuggestions.map((friend, i) => (
          <Flex
            key={friend.name}
            flexDirection="column"
            gap="10px"
            mb="20px"
            backgroundColor="#D6B3EE"
            borderRadius="10px"
            padding="10px"
          >
            <Flex gap="10px">
              <Image
                src={images[friend.profileIcon]}
                alt="Profile Icon"
                boxSize="50px"
              />
              <Box>
                <Text
                  fontWeight="600"
                  width="fit-content"
                  cursor="pointer"
                  style={{ transition: ".5s", textAlign: "center" }}
                  _hover={{ transform: "scale(1.01)" }}
                >
                  {friend.name}
                </Text>
                {friend?.mutualFriends && (
                  <Box style={{ fontSize: "10px", color: "black" }}>
                    {friend?.mutualFriends.map((fr) => (
                      <Text
                        key={fr.userId}
                        cursor="pointer"
                        as="span"
                      >{` ${fr.name}, `}</Text>
                    ))}
                    <Text as="span">are mutual friends</Text>
                  </Box>
                )}
              </Box>
            </Flex>
            <Button
              borderRadius="10px"
              colorScheme={
                friend.status !== "not"
                  ? friend.status === "sent"
                    ? "orange"
                    : "green"
                  : "blue"
              }
              onClick={() => {
                modifyFriend(i);
              }}
            >
              {friend.status !== "not"
                ? friend.status === "sent"
                  ? "Request Sent"
                  : "Already Friends"
                : "Add Friend"}
            </Button>
          </Flex>
        ))
      ) : (
        <Text>No Suggestions Found</Text>
      )}
    </>
  );
};
export default SuggestionsCard;
