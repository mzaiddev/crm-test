import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Flex,
  Image,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { handleLogin } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleLogin({ email, password });
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: 'Reset link sent',
      description: 'Check your email for password reset instructions',
      status: 'success',
      duration: 3000,
    });
    onClose();
  };

  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Left Side - Image/Branding */}
      <Box
        flex={1}
        bg="linear-gradient(135deg, #E8DCC8 0%, #C8A770 100%)"
        display={{ base: 'none', md: 'flex' }}
        alignItems="center"
        justifyContent="center"
        p={12}
      >
        <VStack spacing={6}>
          <Box w="60px" h="60px" bg="white" borderRadius="md" />
          <Text fontSize="4xl" fontWeight="bold" color="white">
            Weeam
          </Text>
          <Text fontSize="2xl" color="white" textAlign="center">
            Real Estate CRM
          </Text>
          <Text color="white" opacity={0.9} textAlign="center" maxW="400px">
            Welcome to the future of real estate
          </Text>
        </VStack>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={8}
      >
        <Box maxW="450px" w="full">
          <VStack spacing={8} align="stretch">
            <VStack spacing={2}>
              <Flex align="center" gap={2}>
                <Box w="40px" h="40px" bg="gold.500" borderRadius="md" />
                <Text fontSize="2xl" fontWeight="bold" color="gold.600">
                  Weeam
                </Text>
              </Flex>
              <Text fontSize="3xl" fontWeight="bold" color="gray.800">
                Sign In Access
              </Text>
              <Text color="gray.600" textAlign="center">
                You must become a member to login and access the entire site.
              </Text>
            </VStack>

            <form onSubmit={onSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={errors.email}>
                  <InputGroup>
                    <InputLeftElement>
                      <EmailIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      bg="white"
                    />
                  </InputGroup>
                  {errors.email && (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <InputGroup>
                    <InputLeftElement>
                      <LockIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      bg="white"
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        size="sm"
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password"
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  w="full"
                  size="lg"
                  bg="gold.500"
                  color="white"
                  _hover={{ bg: 'gold.600' }}
                >
                  SIGN IN
                </Button>

                <Text color="gray.500">OR</Text>

                <Button
                  variant="link"
                  color="gray.700"
                  onClick={onOpen}
                  fontSize="sm"
                >
                  Forgot Password?
                </Button>

                <Text color="gray.700">
                  Signup as an agent
                </Text>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Box>

      {/* Forgot Password Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input placeholder="Enter your email" type="email" />
              </FormControl>
              <Button
                w="full"
                bg="gold.500"
                color="white"
                _hover={{ bg: 'gold.600' }}
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
