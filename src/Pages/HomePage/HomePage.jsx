import React, { useEffect, useState } from "react";
import { useDisclosure, Box, Text, Image, Flex } from "@chakra-ui/react";
import SharePost from "../../Components/SharePost";
import CreatePost from "../../Components/CreatePost";
import nyc from "../../assets/NYC.png";
import statueofLiberty from "../../assets/statueofLiberty.png";
import feedCreatorIcon from "../../assets/feedCreatorIcon.png";
import feedCreatorIcon2 from "../../assets/feedCreatorIcon2.png";
import thumbnail from "../../assets/thumbnail.png";
import likes from "../../assets/likes.png";
import share from "../../assets/share.png";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import telegram from "../../assets/telegram.png";
import twitter from "../../assets/twitter.png";
import reddit from "../../assets/reddit.png";
import discord from "../../assets/discord.png";
import whatsapp from "../../assets/whatsapp.png";
import messenger from "../../assets/messenger.png";
import { useNavigate } from "react-router-dom";
import Suggestions from "../../Components/SuggestionsCard";
import { useSelector } from "react-redux";
import { default_Profile_Icon } from "../../Constants/Constants";

const FeedContent = ({ content }) => (
  <Text as="span">
    {content.split(/(#\w+)/g).map((part, index) => {
      return /(#\w+)/g.test(part) ? (
        <Text
          as="span"
          key={index}
          style={{
            color: "#3C8DFF",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {part}
        </Text>
      ) : (
        part
      );
    })}
  </Text>
);

function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate
  } = useDisclosure();
  const [feedID, setFeedID] = useState(0);
  const [feedData, setFeedData] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, profileImage, name } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
    setFeedData(feedDataasdas);
    setSocialMedia(socialMediaasdasd);
  }, []);

  return (
    <Flex gap="30px">
      <Box p="2rem" pr="5px" w="75%" minHeight="100vh">
        <Flex
          position="fixed"
          right="50px"
          bottom="50px"
          w="50px"
          h="50px"
          bg="black"
          color="white"
          borderRadius="full"
          justifyContent="center"
          alignItems="center"
          fontSize="33px"
          cursor="pointer"
          zIndex="10"
          onClick={onOpenCreate}
        >
          +
        </Flex>
        <Flex
          gap="10px"
          mb="20px"
          width="fit-content"
          p="10px"
          pr="150px"
          borderRadius="10px"
          cursor="pointer"
          backgroundColor="#2E5077"
          color="white"
          alignItems="center"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Image
            src={profileImage || default_Profile_Icon}
            alt="Profile Icon"
            boxSize="60px"
            borderRadius="50%"
          />
          <Box>
            <Text>Welcome Back</Text>
            <Text fontWeight="bold">{name}</Text>
          </Box>
        </Flex>
        <Text fontSize="24px" fontWeight="800" mb="20px">
          Feeds
        </Text>
        <Box>
          {feedData.map((feed) => (
            <Box
              key={feed.id}
              bg="#F7EBFF"
              borderRadius="20px"
              p="20px"
              mb="20px"
            >
              <Flex gap="10px">
                <Image src={feed.image} alt="Profile" boxSize="50px" />
                <Box>
                  <Text
                    fontSize="16px"
                    fontWeight="600"
                    lineHeight="18.7px"
                    color="#000000"
                  >
                    {feed.name}
                  </Text>
                  <Text
                    fontSize="10px"
                    fontWeight="400"
                    lineHeight="12.4px"
                    color="#000000"
                    opacity="60%"
                  >
                    {feed.time} ago
                  </Text>
                </Box>
              </Flex>
              <Text my="10px">
                <FeedContent content={feed.content} />
              </Text>
              <Flex gap="10px">
                {feed.images.map((image, index) => (
                  <Image key={index} src={image} alt="Feed" maxHeight="100px" />
                ))}
              </Flex>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                pt="10px"
              >
                <Flex gap="10px">
                  <Image src={likes} alt="Like" boxSize="20px" />
                  <Text>{feed.likes}</Text>
                </Flex>
                <Flex
                  gap="10px"
                  cursor="pointer"
                  borderRadius="30px"
                  padding="7px 26px "
                  backgroundColor="rgba(0, 0, 0, 0.07)"
                  onClick={() => {
                    setFeedID(feed.id);
                    onOpen();
                  }}
                  alignItems="center"
                >
                  <Image src={share} alt="Share" boxSize="16px" />
                  <Text fontWeight="600" color="#000000">
                    Share
                  </Text>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Box>
        <SharePost
          socialMedia={socialMedia}
          feedID={feedID}
          isOpen={isOpen}
          onClose={onClose}
        />
        <CreatePost isOpen={isOpenCreate} onClose={onCloseCreate} />
      </Box>
      <Box p="20px 5px" pt="2rem">
        <Text fontSize="24px" fontWeight="600" mb="10px">
          Friend Suggestions
        </Text>
        <Suggestions />
        {/* {friendSuggestions.map((friend, i) => (
          <Suggestions modifyFriend={modifyFriend} friend={friend} i={i} />
        ))} */}
      </Box>
    </Flex>
  );
}

export default HomePage;

const feedDataasdas = [
  {
    id: 1,
    image: feedCreatorIcon,
    name: "Aarav",
    time: "2 hours",
    content:
      "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽 #NYC #Travel",
    likes: 67,
    images: [nyc, statueofLiberty],
    user: ""
  },
  {
    id: 2,
    image: feedCreatorIcon2,
    name: "Sneha",
    time: "1 day",
    content:
      "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary 💕. #SelfCare #MeTime #Wellness",
    likes: 69,
    images: [thumbnail],
    user: ""
  },
  {
    id: 3,
    image: feedCreatorIcon,
    name: "Rohan",
    time: "3 hours",
    content:
      "Weekend hikes are the best! 🌄 Breathtaking views and the joy of connecting with nature. #HikingAdventures #NatureLovers",
    likes: 45,
    images: [],
    user: ""
  },
  {
    id: 4,
    image: feedCreatorIcon2,
    name: "Priya",
    time: "5 days",
    content:
      "Finally perfected my homemade pizza recipe 🍕! Sharing the love with friends tonight. #CookingGoals #Foodie",
    likes: 82,
    images: [],
    user: ""
  },
  {
    id: 5,
    image: feedCreatorIcon,
    name: "Aditya",
    time: "8 hours",
    content:
      "Exploring the world of art and colors 🎨🖌️. Spent the afternoon creating this masterpiece. #ArtLovers #CreativeVibes",
    likes: 52,
    images: [],
    user: ""
  }
];

const socialMediaasdasd = [
  { name: "Facebook", src: facebook, background: "#E7F1FD" },
  { name: "Instagram", src: instagram, background: "#FF40C617" },
  { name: "Twitter", src: twitter, background: "#E9F6FB " },
  { name: "Reddit", src: reddit, background: "#FDECE7" },
  { name: "Messenger", src: messenger, background: "#E5F3FE" },
  { name: "Whatsapp", src: whatsapp, background: "#E7FBF0" },
  { name: "Discord", src: discord, background: "#ECF5FA" },
  { name: "Telegram", src: telegram, background: "#E6F3FB" }
];
