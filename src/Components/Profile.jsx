import calmBackground from "../assets/calmBackground.jpg";
import parachute from "../assets/parachute.png";
import partylighting from "../assets/partylighting.png";
import nyc from "../assets/NYC.png";
import sakshiAgarwal from "../assets/sakshiAgarwal.jpg";
import working from "../assets/working.png";
import likeGray from "../assets/likeGray.png";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EditIcon from "./EditIcon";
import CreatePost from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { base_URL, default_Profile_Icon } from "../Constants/Constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isLoggedIn, name, bio, profileImage, backgroundImage, token } =
    useSelector((state) => state.user);
  const [profileIcon, setProfileIcon] = useState(profileImage);
  const [backgroundIcon, setBackgroundIcon] = useState(backgroundImage);
  const [profileIconFile, setProfileIconFile] = useState(profileImage);
  const [backgroundIconFile, setBackgroundIconFile] = useState(backgroundImage);
  const [leftColumn, setLeftColumn] = useState([]);
  const [rightColumn, setRightColumn] = useState([]);
  const [middleColumn, setMiddleColumn] = useState([]);
  const [editProfile, setEditProfile] = useState(true);
  const [userName, setUserName] = useState(name);
  const [userBio, setUserBio] = useState(bio);
  const [editingName, setEditingName] = useState("");
  const [editingBio, setEditingBio] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    setLeftColumn(myPosts.filter((col, index) => index % 3 === 0));
    setMiddleColumn(myPosts.filter((col, index) => index % 3 === 1));
    setRightColumn(myPosts.filter((col, index) => index % 3 === 2));
  }, []);
  useEffect(() => {
    if (editProfile) {
      setEditingBio(userBio);
      setEditingName(userName);
    }
  }, [editProfile]);
  const toast = useToast();
  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("name", editingName);
    formData.append("bio", editingBio);
    formData.append("profileImage", profileIconFile);
    formData.append("backgroundImage", backgroundIconFile);
    try {
      const response = await axios.post(
        `${base_URL}/users/updateProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.status) {
        setUserName(editingName);
        setUserBio(editingBio);
        dispatch({
          type: "PROFILE",
          payload: {
            ...response?.data?.data
          }
        });
        setEditingName("");
        setEditingBio("");
        setEditProfile(false);
      } else {
        toast({
          description: response.msg || "Something went wrong.",
          status: "error",
          duration: 1000
        });
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast({
          description: "User already exists. Please use a different email.",
          status: "error",
          duration: 1000
        });
      } else {
        console.error("Error:", error);
        toast({
          description:
            error.response?.data?.msg ||
            "Server error. Please try again later.",
          status: "error",
          duration: 1000
        });
      }
    }
  };
  return (
    <Box width="100%">
      <Box width="70%" margin="auto">
        <Box height="200px" width="100%" position="relative">
          <Image
            height="100%"
            width="100%"
            borderRadius="0 0 20px 20px"
            src={backgroundIcon}
            alt="backgroundIcon"
          />
          {editProfile && (
            <EditIcon
              id="backgroundIcon"
              setFile={setBackgroundIcon}
              setRawFile={setBackgroundIconFile}
              iconStyle={{
                left: "93%",
                top: "-20%",
                position: "absolute",
                borderRadius: "50%"
              }}
            />
          )}
        </Box>
        <Flex width="100%">
          <Box
            position="relative"
            top="-56px"
            marginLeft="5%"
            overflow="hidden"
          >
            <Image
              src={profileIcon || default_Profile_Icon}
              borderRadius="50%"
              height="112px"
              width="112px"
              alt="profileIcon"
            />
            {editProfile && (
              <EditIcon
                id="profileIcon"
                setFile={setProfileIcon}
                setRawFile={setProfileIconFile}
                iconStyle={{
                  top: "-25%",
                  left: "75%",
                  position: "absolute",
                  borderRadius: "50%"
                }}
              />
            )}
          </Box>
          {/* <Box
            backgroundImage={`url(${profileIcon})`}
            backgroundSize="cover"
            backgroundPosition="center"
            height="112px"
            width="112px"
            position="relative"
            top="-56px"
            marginLeft="5%"
            borderRadius="50%"
          >
            {editProfile && (
              <EditIcon
                id="profileIcon"
                setFile={setProfileIcon}
                iconStyle={{ top: "73%", left: "73%" }}
              />
            )}
          </Box> */}
          {!editProfile && (
            <Box
              position="relative"
              width="calc(100% - 150px)"
              onClick={() => {
                setEditProfile(true);
              }}
            >
              <Button
                width="90%"
                margin="2% 5%"
                padding="5px 16px 5px 16px"
                borderRadius="36px "
                border="1px solid #000000"
                backgroundColor="transparent"
                _hover={{ opacity: 0.9 }}
              >
                Edit Profile
              </Button>
            </Box>
          )}
        </Flex>
        {editProfile ? (
          <Flex
            height="50vh"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Box>
              <label>
                <Text>Name</Text>
                <Input
                  fontSize="14px"
                  fontWeight="600"
                  lineHeight="17.36px"
                  type="text"
                  onChange={(e) => setEditingName(e.target.value)}
                  value={editingName}
                  border="none"
                  borderRadius="none"
                  borderBottom="1px solid black"
                />
              </label>
              <hr height="30px" />
              <label>
                <Text fontSize="14px" fontWeight="400" lineHeight="17.36px">
                  Bio
                </Text>
                <Textarea
                  // height="fit-content"
                  fontSize="14px"
                  fontWeight="600"
                  lineHeight="17.36px"
                  type="text"
                  onChange={(e) => setEditingBio(e.target.value)}
                  value={editingBio}
                  border="none"
                  borderRadius="none"
                  borderBottom="1px solid black"
                  resize="none"
                />
              </label>
            </Box>
            <Flex>
              <Button
                backgroundColor="black"
                color="white"
                borderRadius="50px"
                mr={3}
                _hover={{ bg: "gray", color: "black" }}
                width="100%"
                onClick={() => {
                  setEditingName("");
                  setEditingBio("");
                  setEditProfile(false);
                }}
              >
                Cancel
              </Button>
              <Button
                backgroundColor="black"
                color="white"
                borderRadius="50px"
                mr={3}
                _hover={{ bg: "gray", color: "black" }}
                width="100%"
                onClick={updateProfile}
              >
                Save
              </Button>
            </Flex>
          </Flex>
        ) : (
          <>
            <Text fontSize="24px" fontWeight="800" lineHeight="28.06px">
              {userName}
            </Text>
            <Text
              fontSize="14px"
              marginTop="15px"
              fontWeight="400"
              lineHeight="17.36px"
            >
              {userBio}
            </Text>
            <Box paddingTop="5%">
              <Text fontSize="18px" fontWeight="600" lineHeight="21.04px">
                My posts
              </Text>
              <Flex flexWrap="wrap" gap="5%">
                {/* {myPosts.map((post, index) => (
              <Box
                background={`url(${post.images[0]})`}
                width="45%"
                height="250px"
                backgroundSize="cover"
                backgroundPosition="center"
                borderRadius="30px"
                marginTop={index % 2 == 1 ? "50px" : "10px"}
              >
                <Box paddingTop="90%" paddingLeft="5%">
                  <Text color="white">{post.title}</Text>
                  <Flex gap="10px">
                    <Image src={likeGray} alt="Like" boxSize="20px" />
                    <Text color="white">{post.likes}</Text>
                  </Flex>
                </Box>
              </Box>
            ))} */}
                <Flex flexDirection="column" width="30%">
                  {leftColumn.map((post, index) => (
                    <Box
                      cursor="pointer"
                      _hover={{ transform: "scale(.95)" }}
                      transition="transform .25s"
                      key={post.id}
                      background={`url(${post.images[0]})`}
                      height={index % 2 === 1 ? "50vh" : "60vh"}
                      backgroundSize="cover"
                      backgroundPosition="center"
                      borderRadius="30px"
                      marginTop="10px"
                    >
                      <Box
                        position="relative"
                        top={index % 2 !== 1 ? "80%" : "75%"}
                        left="5%"
                      >
                        <Text color="white">{post.title}</Text>
                        <Flex gap="10px">
                          <Image src={likeGray} alt="Like" boxSize="20px" />
                          <Text color="white">{post.likes}</Text>
                        </Flex>
                      </Box>
                    </Box>
                  ))}
                </Flex>
                <Flex flexDirection="column" width="30%">
                  {middleColumn.map((post, index) => (
                    <Box
                      cursor="pointer"
                      _hover={{ transform: "scale(.95)" }}
                      transition="transform .25s"
                      key={post.id}
                      background={`url(${post.images[0]})`}
                      height={index % 2 !== 1 ? "50vh" : "60vh"}
                      backgroundSize="cover"
                      backgroundPosition="center"
                      borderRadius="30px"
                      marginTop="10px"
                    >
                      <Box
                        position="relative"
                        top={index % 2 !== 1 ? "75%" : "80%"}
                        left="5%"
                      >
                        <Text color="white">{post.title}</Text>
                        <Flex gap="10px">
                          <Image src={likeGray} alt="Like" boxSize="20px" />
                          <Text color="white">{post.likes}</Text>
                        </Flex>
                      </Box>
                    </Box>
                  ))}
                </Flex>
                <Flex flexDirection="column" width="30%">
                  {rightColumn.map((post, index) => (
                    <Box
                      cursor="pointer"
                      _hover={{ transform: "scale(.95)" }}
                      transition="transform .25s"
                      key={post.id}
                      background={`url(${post.images[0]})`}
                      backgroundSize="cover"
                      backgroundPosition="center"
                      borderRadius="30px"
                      marginTop="10px"
                      height={index % 2 === 1 ? "50vh" : "60vh"}
                    >
                      <Box
                        position="relative"
                        top={index % 2 !== 1 ? "75%" : "80%"}
                        left="5%"
                      >
                        <Text color="white">{post.title}</Text>
                        <Flex gap="10px">
                          <Image src={likeGray} alt="Like" boxSize="20px" />
                          <Text color="white">{post.likes}</Text>
                        </Flex>
                      </Box>
                    </Box>
                  ))}
                </Flex>
              </Flex>
            </Box>
          </>
        )}
      </Box>
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
        onClick={onOpen}
      >
        +
      </Flex>
      <CreatePost isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
export default Profile;

const myPosts = [
  {
    id: 1,
    title: "Design Meet",
    content:
      "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽 #NYC #Travel",
    likes: 67,
    images: [partylighting, nyc]
  },
  {
    id: 2,
    title: "Working on a B2B...",
    content:
      "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary 💕. #SelfCare #MeTime #Wellness",
    likes: 40,
    images: [working]
  },
  {
    id: 3,
    title: "Parachute ❤️",
    content:
      "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary 💕. #SelfCare #MeTime #Wellness",
    likes: 65,
    images: [parachute]
  },
  {
    id: 4,
    title: "Parachute ❤️",
    content:
      "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary 💕. #SelfCare #MeTime #Wellness",
    likes: 65,
    images: [parachute]
  },
  {
    id: 5,
    title: "Parachute ❤️",
    content:
      "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary 💕. #SelfCare #MeTime #Wellness",
    likes: 65,
    images: [parachute]
  },
  {
    id: 6,
    title: "Parachute ❤️",
    content:
      "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary 💕. #SelfCare #MeTime #Wellness",
    likes: 65,
    images: [parachute]
  },
  {
    id: 7,
    title: "Design Meet",
    content:
      "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽 #NYC #Travel",
    likes: 67,
    images: [partylighting, nyc]
  },
  {
    id: 8,
    title: "Working on a B2B...",
    content:
      "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary 💕. #SelfCare #MeTime #Wellness",
    likes: 40,
    images: [working]
  },
  {
    id: 9,
    title: "Parachute ❤️",
    content:
      "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary 💕. #SelfCare #MeTime #Wellness",
    likes: 65,
    images: [parachute]
  },
  {
    id: 10,
    title: "Parachute ❤️",
    content:
      "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary 💕. #SelfCare #MeTime #Wellness",
    likes: 65,
    images: [parachute]
  },
  {
    id: 11,
    title: "Design Meet",
    content:
      "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽 #NYC #Travel",
    likes: 67,
    images: [partylighting, nyc]
  }
];
