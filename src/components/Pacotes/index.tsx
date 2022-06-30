import { ReactNode } from 'react';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Img,
  Flex,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { Navbar } from '../Navbar';
import pix from '../../assets/pix.svg';

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}
      bg="gray.200"
    >
      {children}
    </Box>
  );
}

export default function Pacotes() {
  return (
    <Flex direction="column" bg="gray.100" h="100vh">
      <Navbar />
      <Box py={12}>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl" color="orange.400">
            Quanto mais bilhetes mais chances
          </Heading>
          <Text fontSize="lg" color={'gray.500'}>
            Escolha quantos números da sorte você quer!
          </Text>
        </VStack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}
        >
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Pacote 20
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  R$
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  20
                </Text>
                {/* <Text fontSize="3xl" color="gray.500">
                  /month
                </Text> */}
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />1 bilhete por
                  R$ 20,00 reais
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />1 chance de
                  ganhar
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="orange" variant="outline">
                  Comprar
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>

          <PriceWrapper>
            <Box position="relative">
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: 'translate(-50%)' }}
              >
                <Text
                  textTransform="uppercase"
                  bg={useColorModeValue('green.300', 'green.700')}
                  px={3}
                  py={1}
                  // color={useColorModeValue('gray.900', 'gray.300')}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl"
                  color="white"
                >
                  Mais popular
                </Text>
              </Box>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Pacote 30
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    R$
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    30
                  </Text>
                  {/* <Text fontSize="3xl" color="gray.500">
                    /month
                  </Text> */}
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />3 bilhetes
                    por R$ 30 reais
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    3x mais chances de ganhar
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Button w="full" colorScheme="orange">
                    Comprar
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Pacote 50
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  R$
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  50
                </Text>
                {/* <Text fontSize="3xl" color="gray.500">
                  /month
                </Text> */}
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />5 bilhetes
                  por R$ 50 reais
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  5x mais chances de ganhar
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="orange" variant="outline">
                  Comprar
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>
        </Stack>
      </Box>
      <Flex justify="center" mt="-3rem">
        <Img src={pix} w="7rem" />
      </Flex>
    </Flex>
  );
}
