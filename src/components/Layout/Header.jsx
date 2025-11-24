import {
  Box,
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useColorMode,
  Badge,
} from '@chakra-ui/react';
import { MdNotifications, MdBrightness4, MdBrightness7 } from 'react-icons/md';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const { user, handleLogout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      h="70px"
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      px={6}
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex h="full" align="center" justify="flex-end" gap={4}>
        <IconButton
          icon={colorMode === 'light' ? <MdBrightness4 /> : <MdBrightness7 />}
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
        />
        
        <Box position="relative">
          <IconButton
            icon={<MdNotifications />}
            variant="ghost"
            aria-label="Notifications"
          />
          <Badge
            position="absolute"
            top="8px"
            right="8px"
            colorScheme="red"
            borderRadius="full"
            fontSize="xs"
          >
            12
          </Badge>
        </Box>

        <Menu>
          <MenuButton>
            <Flex align="center" gap={2} cursor="pointer">
              <Text fontSize="sm" fontWeight="500">
                Hey, {user?.name || 'Admin'}
              </Text>
              <Avatar size="sm" bg="gold.500" />
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
