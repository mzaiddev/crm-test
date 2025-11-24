import { Box, Flex } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useSelector } from 'react-redux';

export const MainLayout = ({ children }) => {
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  return (
    <Flex minH="100vh" bg="gray.50">
      <Sidebar />
      <Box
        flex={1}
        ml={isSidebarOpen ? '260px' : '72px'}
        transition="margin-left 0.2s"
      >
        <Header />
        <Box p={6}>{children}</Box>
      </Box>
    </Flex>
  );
};
