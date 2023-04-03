import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleColorMode: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleColorMode();
  };

  const renderIcon = () => (colorMode === "dark" ? <SunIcon /> : <MoonIcon />);

  return <Button onClick={handleClick}>{renderIcon()}</Button>;
};

export default ToggleColorMode;
