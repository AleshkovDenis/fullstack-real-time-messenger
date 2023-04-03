import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleColorMode: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleColorMode();
  };

  const renderIcon = () => (colorMode === "dark" ? <SunIcon /> : <MoonIcon />);

  return <Button position="absolute" right="5px" top="5px" onClick={handleClick}>{renderIcon()}</Button>;
};

export default ToggleColorMode;
