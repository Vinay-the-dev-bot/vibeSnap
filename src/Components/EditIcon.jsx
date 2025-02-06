import { Box, Image, Input } from "@chakra-ui/react";
import pencil from "../assets/pencil.png";
const EditIcon = ({ iconStyle, onClick, setFile, id, setRawFile }) => {
  return (
    <Box boxSize="100%" cursor="pointer" position="absolute" onClick={onClick}>
      <label htmlFor={id}>
        <Image
          position="relative"
          padding="5px"
          borderRadius="20px"
          background="#F4F4F4"
          src={pencil}
          alt="edit_icon"
          style={{ ...iconStyle }}
        />
        <Input
          onChange={(e) => {
            const file = e.target.files[0];
            console.log("e.target", URL.createObjectURL(file));
            if (file) {
              setFile(URL.createObjectURL(file));
              setRawFile(file);
            }
          }}
          id={id}
          type="file"
          display="none"
          multiple
          accept="image/*"
        />
      </label>
    </Box>
  );
};
export default EditIcon;
