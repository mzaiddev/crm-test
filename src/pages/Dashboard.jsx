import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  Icon,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { MdContacts, MdToday, MdStar, MdTrendingUp } from 'react-icons/md';
import { MainLayout } from '../components/Layout/MainLayout';
import { useContacts } from '../hooks/useContacts';
import { lazy, Suspense } from 'react';

const ContactsChart = lazy(() => import('../components/Dashboard/ContactsChart'));

const StatCard = ({ title, value, icon, color, trend, helpText }) => (
  <Box
    bg={`${color}.500`}
    p={6}
    borderRadius="xl"
    color="white"
    position="relative"
    overflow="hidden"
  >
    <Flex justify="space-between" align="start">
      <Box>
        <StatLabel fontSize="sm" opacity={0.9} mb={2}>
          {title}
        </StatLabel>
        <StatNumber fontSize="3xl" fontWeight="bold">
          {value}
        </StatNumber>
        {helpText && (
          <StatHelpText color="white" mb={0}>
            <StatArrow type={trend > 0 ? 'increase' : 'decrease'} />
            {Math.abs(trend)}% from yesterday
          </StatHelpText>
        )}
      </Box>
      <Icon
        as={icon}
        boxSize={12}
        opacity={0.3}
        position="absolute"
        right={4}
        top={4}
      />
    </Flex>
  </Box>
);

export default function Dashboard() {
  const { totalContacts, todayContacts, favoriteContacts } = useContacts();

  return (
    <MainLayout>
      <Box>
        {/* Welcome Section */}
        <Flex align="center" gap={3} mb={8}>
          <Box w="60px" h="60px" bg="gold.500" borderRadius="md" />
          <Box>
            <Text fontSize="3xl" fontWeight="bold" color="gold.600">
              Weeam Real Estate CRM
            </Text>
            <Text color="gray.600">Welcome to the future of real estate</Text>
          </Box>
        </Flex>

        {/* Online Status */}
        <Box
          bg="white"
          p={4}
          borderRadius="lg"
          mb={6}
          borderLeft="4px"
          borderColor="green.400"
        >
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={3}>
              <Icon as={MdContacts} color="green.500" boxSize={6} />
              <Box>
                <Text fontWeight="600">Online Users</Text>
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                  1
                </Text>
              </Box>
            </Flex>
            <Badge colorScheme="green" fontSize="md" px={3} py={1}>
              LIVE
            </Badge>
          </Flex>
        </Box>

        {/* Stats Section */}
        <Text fontSize="xl" fontWeight="600" mb={4}>
          Monthly Sales Performance
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <StatCard
            title="Total Contacts"
            value={totalContacts}
            icon={MdContacts}
            color="purple"
            trend={8}
            helpText="Active contacts"
          />
          <StatCard
            title="Added Today"
            value={todayContacts}
            icon={MdToday}
            color="pink"
            trend={12}
            helpText="New today"
          />
          <StatCard
            title="Favorites"
            value={favoriteContacts}
            icon={MdStar}
            color="blue"
            trend={5}
            helpText="Starred contacts"
          />
          <StatCard
            title="Target Achievement"
            value="2.6%"
            icon={MdTrendingUp}
            color="green"
            trend={-2}
            helpText="Below target"
          />
        </SimpleGrid>

        {/* Chart Section */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <Text fontSize="lg" fontWeight="600" mb={4}>
            Contact Growth
          </Text>
          <Suspense fallback={<Box h="300px" />}>
            <ContactsChart />
          </Suspense>
        </Box>
      </Box>
    </MainLayout>
  );
}
