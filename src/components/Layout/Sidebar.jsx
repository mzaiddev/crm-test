import {
  Box,
  VStack,
  Icon,
  Text,
  Flex,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdContacts,
  MdTimeline,
  MdMenu,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/slices/uiSlice';

const menuItems = [
  { path: '/dashboard', icon: MdDashboard, label: 'Dashboard' },
  { path: '/contacts', icon: MdContacts, label: 'Contacts' },
  { path: '/timeline', icon: MdTimeline, label: 'Activity Timeline' },
];

export const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  if (!isSidebarOpen) {
    return (
      <Box
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        bg="white"
        borderRight="1px"
        borderColor="gray.200"
        p={4}
        zIndex={1000}
      >
        <IconButton
          icon={<MdMenu />}
          onClick={() => dispatch(toggleSidebar())}
          variant="ghost"
          aria-label="Open sidebar"
        />
      </Box>
    );
  }

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      w="260px"
      h="100vh"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      overflowY="auto"
      zIndex={1000}
    >
      <Flex align="center" justify="space-between" p={6} borderBottom="1px" borderColor="gray.200">
        <Flex align="center" gap={2}>
          <Box w="40px" h="40px" bg="gold.500" borderRadius="md" />
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            Weeam CRM
          </Text>
        </Flex>
        <IconButton
          icon={<MdMenu />}
          onClick={() => dispatch(toggleSidebar())}
          variant="ghost"
          size="sm"
          aria-label="Close sidebar"
        />
      </Flex>

      <VStack spacing={1} align="stretch" p={4}>
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <Flex
                align="center"
                gap={3}
                p={3}
                borderRadius="md"
                bg={isActive ? 'gold.50' : 'transparent'}
                color={isActive ? 'gold.700' : 'gray.600'}
                fontWeight={isActive ? '600' : '400'}
                _hover={{ bg: 'gold.50', color: 'gold.700' }}
                transition="all 0.2s"
              >
                <Icon as={item.icon} boxSize={5} />
                <Text>{item.label}</Text>
              </Flex>
            )}
          </NavLink>
        ))}
      </VStack>
    </Box>
  );
};
