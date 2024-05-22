import { ReactNode } from 'react';
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

interface PacotesCardProps {
  pkt: string;
  qtd: number;
}

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}
      bg="#214539"
    >
      {children}
    </Box>
  );
}

export function PacotesCardComponent({ pkt, qtd }: PacotesCardProps) {
  const pkt50 = () => {
    return (
      <Box
        _hover={{
          transition: 'all 0.3s ease',
          transform: 'scale(1.05)',
        }}
      >
        <PriceWrapper>
          <Box py={4} px={12}>
            <Heading
              display="flex"
              justifyContent="center"
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
                {50 * qtd}
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
                <ListIcon as={FaCheckCircle} color="green.500" />
                {5 * qtd} bilhetes por R$ {50 * qtd} reais
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {5 * qtd}x mais chances de ganhar
              </ListItem>
            </List>
          </VStack>
        </PriceWrapper>
      </Box>
    );
  };

  const pkt30 = () => {
    return (
      <Box
        _hover={{
          transition: 'all 0.3s ease',
          transform: 'scale(1.05)',
        }}
      >
        <PriceWrapper>
          <Box position="relative">
            <Box py={4} px={12}>
              <Heading
                display="flex"
                justifyContent="center"
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
                  {30 * qtd}
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
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {2 * qtd} bilhetes por R$ {30 * qtd} reais
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {2 * qtd}x mais chances de ganhar
                </ListItem>
              </List>
            </VStack>
          </Box>
        </PriceWrapper>
      </Box>
    );
  };

  const pkt20 = () => {
    return (
      <Box
        _hover={{
          transition: 'all 0.3s ease',
          transform: 'scale(1.05)',
        }}
      >
        <PriceWrapper>
          <Box py={4} px={12}>
            <Heading
              display="flex"
              justifyContent="center"
              as="h2"
              size="xl"
              bgGradient="linear(to-r, #FFCD97, #DA9D5C)"
              backgroundClip="text"
            >
              Bronze
            </Heading>
            <HStack justifyContent="center" color="#f6f6f6">
              <Text fontSize="3xl" fontWeight="600">
                R$
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                {20 * qtd}
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
                <ListIcon as={FaCheckCircle} color="green.500" />
                {1 * qtd} {1 * qtd > 1 ? 'bilhetes' : 'bilhete'} por R${' '}
                {20 * qtd},00 reais
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Chances mensais de ganhar
              </ListItem>
            </List>
          </VStack>
        </PriceWrapper>
      </Box>
    );
  };

  if (pkt === '50') {
    return pkt50();
  } else if (pkt === '30') {
    return pkt30();
  } else {
    return pkt20();
  }
}
