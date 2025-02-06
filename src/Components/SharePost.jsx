import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Grid,
  Flex,
  Image,
  Text,
  Img
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import copy from "../assets/copy.png";
const SharePost = ({ socialMedia, onClose, isOpen, feedID }) => {
  const toast = useToast();
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="12px">
          <ModalHeader>
            <Text fontSize="24px" fontWeight="800" lineHeight="28.06px">
              Share Post
            </Text>
          </ModalHeader>
          <Box
            style={{
              backgroundColor: "#F5F5F5",
              width: "20px"
            }}
          >
            <ModalCloseButton borderRadius="50%" backgroundColor="#F5F5F5" />
          </Box>
          <ModalBody style={{ paddingBottom: "25px" }}>
            <Grid gridTemplateColumns="repeat(4, 1fr)" rowGap="10px">
              {socialMedia.map((sm) => (
                <Flex
                  alignItems="center"
                  flexDirection="column"
                  borderRadius="50%"
                  key={sm.name}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    borderRadius="50%"
                    width="56px"
                    justifyContent="center"
                    backgroundColor={sm.background}
                    height="56px"
                    cursor="pointer"
                    key={sm.name}
                  >
                    <Image src={sm.src} alt="sm" />
                  </Box>
                  <Text>{sm.name}</Text>
                </Flex>
              ))}
            </Grid>
            <Text
              fontSize="16px"
              fontWeight="600"
              lineHeight="18px"
              margin="10px 0"
            >
              Page Link
            </Text>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              borderRadius="8px"
              padding="10px"
              backgroundColor="#D9D9D9"
            >
              <Text
                fontSize="12px"
                fontWeight="400"
                lineHeight="14.88px"
                textAlign="center"
                opacity="60%"
              >{`https://www.arnav/feed/${feedID}`}</Text>
              <Img
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `https://www.arnav/feed/${feedID}`
                    );
                    toast({
                      description: "Post link has been copied!",
                      status: "success",
                      duration: 1000
                    });
                  } catch (error) {
                    toast({
                      description: "Failed to copy the post link.",
                      status: "error",
                      duration: 1000
                    });
                  }
                }}
                style={{ cursor: "pointer" }}
                src={copy}
                alt="copy"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default SharePost;
