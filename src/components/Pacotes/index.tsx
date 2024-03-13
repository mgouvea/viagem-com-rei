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
  Img,
  Flex,
  Link,
  useBreakpointValue,
  Button,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { Navbar } from '../Navbar';
import { Link as ReactRouter } from 'react-router-dom';

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
      // bg="teal.700"
      bg="#214539"
    >
      {children}
    </Box>
  );
}

export default function Pacotes() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex direction="column" bg="gray.100" h="100vh">
      <Navbar />
      <Box py={12}>
        <VStack spacing={2} textAlign="center">
          <Heading
            as="h1"
            fontSize={isWideVersion ? '4xl' : '3xl'}
            color="orange.400"
          >
            Quanto mais bilhetes mais chances
          </Heading>
          <Text fontSize={isWideVersion ? 'lg' : 'md'} color={'gray.500'}>
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
          <Box
            _hover={{
              transition: 'all 0.3s ease',
              transform: 'scale(1.05)',
            }}
          >
            <PriceWrapper>
              <Box py={4} px={12}>
                <Heading
                  display="inline-block"
                  as="h2"
                  size="xl"
                  bgGradient="linear(to-r, #FFCD97, #DA9D5C)"
                  backgroundClip="text"
                >
                  Bronze
                </Heading>
                {/* <Text fontWeight="500" fontSize="2xl">
                Bronze
              </Text> */}
                <HStack justifyContent="center" color="#f6f6f6">
                  <Text fontSize="3xl" fontWeight="600">
                    R$
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    20
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />1 bilhete
                    por R$ 20,00 reais
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Chances mensais de ganhar
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Link
                    as={ReactRouter}
                    to={'/checkout/20'}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button w="full" colorScheme="orange" variant="outline">
                      Comprar
                    </Button>
                  </Link>
                </Box>
              </VStack>
            </PriceWrapper>
          </Box>

          <Box
            _hover={{
              transition: 'all 0.3s ease',
              transform: 'scale(1.15)',
            }}
          >
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
                    bg={useColorModeValue('orange.500', 'green.700')}
                    px={3}
                    py={1}
                    fontSize="sm"
                    fontWeight="600"
                    rounded="xl"
                    color="white"
                  >
                    Mais popular
                  </Text>
                </Box>
                <Box py={4} px={12}>
                  <Heading
                    display="inline-block"
                    as="h2"
                    size="xl"
                    bgGradient="linear(to-r, #D3D3D3, #6E7685)"
                    backgroundClip="text"
                  >
                    Prata
                  </Heading>
                  <HStack justifyContent="center" color="#f6f6f6">
                    <Text fontSize="3xl" fontWeight="600">
                      R$
                    </Text>
                    <Text fontSize="5xl" fontWeight="900">
                      30
                    </Text>
                  </HStack>
                </Box>
                <VStack
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  py={4}
                  borderBottomRadius={'xl'}
                >
                  <List spacing={3} textAlign="start" px={12}>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />2
                      bilhetes por R$ 30 reais
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      2x mais chances de ganhar
                    </ListItem>
                  </List>
                  <Box w="80%" pt={7}>
                    <Link
                      as={ReactRouter}
                      to={'/checkout/30'}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button w="full" colorScheme="orange">
                        Comprar
                      </Button>
                    </Link>
                  </Box>
                </VStack>
              </Box>
            </PriceWrapper>
          </Box>

          <Box
            _hover={{
              transition: 'all 0.3s ease',
              transform: 'scale(1.05)',
            }}
          >
            <PriceWrapper>
              <Box py={4} px={12}>
                <Heading
                  display="inline-block"
                  as="h2"
                  size="xl"
                  bgGradient="linear(to-r, #FFD860, #C29200)"
                  backgroundClip="text"
                >
                  Ouro
                </Heading>
                <HStack justifyContent="center" color="#f6f6f6">
                  <Text fontSize="3xl" fontWeight="600">
                    R$
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    50
                  </Text>
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
                  <Link
                    as={ReactRouter}
                    to={`/checkout/50`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button w="full" colorScheme="orange" variant="outline">
                      Comprar
                    </Button>
                  </Link>
                </Box>
              </VStack>
            </PriceWrapper>
          </Box>
        </Stack>
      </Box>
      <Flex justify="center" mt="-3rem">
        <Img src={pix} w="7rem" />
      </Flex>
    </Flex>
  );
}
