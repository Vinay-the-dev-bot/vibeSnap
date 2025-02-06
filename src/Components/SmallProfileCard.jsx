import { Image, Text, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { default_Profile_Icon } from "../Constants/Constants";

const SmallProfileCard = () => {
  const { name, profileImage } = useSelector((state) => state.user);
  return (
    <Flex flexDir="column" alignItems="center">
      <Image
        borderRadius="50%"
        src={profileImage || default_Profile_Icon}
        alt="Profile Icon"
        boxSize="150px"
      />
      <Text>{name}</Text>
    </Flex>
  );
};
export default SmallProfileCard;
