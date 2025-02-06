import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Input,
  Box,
  Text,
  Image,
  Flex
} from "@chakra-ui/react";
import folder from "../assets/folder.png";
import camera from "../assets/camera.png";
import { useState } from "react";
import axios from "axios";
import { base_URL } from "../Constants/Constants";
import { useSelector } from "react-redux";
const CreatePost = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [postText, setPostText] = useState("");
  const { token } = useSelector((state) => state.user);
  const createNewPost = async () => {
    if (!postText) return;
    const formData = new FormData();
    formData.append("postText", postText);
    files.forEach((file) => {
      console.log(file);
      formData.append("images", file);
    });
    console.log(formData.get("images"));

    try {
      const response = await axios.post(`${base_URL}/post/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`
        }
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="20px" fontWeight="800" lineHeight="25px">
            New post
          </ModalHeader>
          <ModalCloseButton borderRadius="50%" backgroundColor="#F5F5F5" />
          <ModalBody>
            <Textarea
              background="#D9D9D99C"
              placeholder="What’s on your mind?"
              resize="none"
              overflowY="auto"
              maxHeight="250px"
              minHeight="250px"
              value={postText}
              onChange={(e) => {
                setPostText(e.target.value);
              }}
              sx={{ "::-webkit-scrollbar": { display: "none" } }}
            />
            <Box mt={4}>
              <label htmlFor="fileInput">
                <Flex alignItems="center" gap="10px">
                  <Image boxSize="16px" src={folder} />
                  <Text
                    as="span"
                    cursor="pointer"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="17.36px"
                    textAlign="left"
                  >
                    Choose the file
                  </Text>
                </Flex>
                <Input
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles([...files, ...Array.from(e.target.files)]);
                    }
                  }}
                  id="fileInput"
                  type="file"
                  display="none"
                  multiple
                  accept="image/*"
                />
              </label>
            </Box>
            <Box mt={4}>
              <label htmlFor="fileInput">
                <Flex alignItems="center" gap="10px" cursor="pointer">
                  <Image boxSize="16px" src={camera} alt="camera icon" />
                  <Text
                    as="span"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="17.36px"
                    textAlign="left"
                  >
                    Camera
                  </Text>
                </Flex>
                <Input
                  //   type="file"
                  accept="image/*"
                  capture="environment"
                  display="none"
                />
              </label>
            </Box>
            <Flex
              // flexDirection="column"
              flexWrap="wrap"
              m="auto"
              width="100%"
              alignItems="center"
              gap="10px"
            >
              {files.map((file, index) => (
                <Flex
                  key={index}
                  justifyContent="space-between"
                  alignItems="center"
                  background="#f5f5f5"
                  p="10px"
                  borderRadius="8px"
                  position="relative"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="preview-image"
                    maxWidth="120px"
                  />
                  <Button
                    size="sm"
                    borderRadius="50%"
                    background="#f5f5f5"
                    position="absolute"
                    color="black"
                    right="0"
                    top="0"
                    onClick={() => {
                      setFiles(files.filter((_, i) => i !== index));
                    }}
                  >
                    X
                  </Button>
                </Flex>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="black"
              color="white"
              borderRadius="50px"
              mr={3}
              _hover={{ bg: "gray", color: "black" }}
              width="100%"
              onClick={createNewPost}
            >
              Create
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreatePost;
