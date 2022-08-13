import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Navbar } from '../Navbar';
// import { Card } from './Card';

import home from '../../assets/funHome2.png';
import phone from '../../assets/iphone5.png';

interface ContentProps {
  name: string;
  phoneNumber: string;
  number: Array<number>;
}

export function PaymentApproved({ name, phoneNumber, number }: ContentProps) {
  return (
    <Flex direction="column" bg="gray.100" h="100vh">
      <Flex
        direction={'column'}
        justify={'top'}
        align="center"
        h="100%"
        pt="3rem"
      >
        <Text fontSize={'2xl'} color="orange.400" fontWeight={'bold'}>
          Parabéns {name}, seu pagamento foi aprovado com sucesso
        </Text>
        <Text color="gray.400" mt="1rem">
          Veja abaixo seus números da sorte
        </Text>
        {number.map((num) => (
          <Flex>
            <Center py={6}>
              <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
              >
                <Image
                  h={'120px'}
                  w={'full'}
                  src={`${home}`}
                  objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-12}>
                  <Avatar
                    size={'xl'}
                    src={`${phone}`}
                    css={{
                      border: '2px solid white',
                    }}
                  />
                </Flex>

                <Box p={6}>
                  <Stack spacing={0} align={'center'} mb={5}>
                    <Heading
                      fontSize={'2xl'}
                      fontWeight={500}
                      fontFamily={'body'}
                    >
                      {num}
                    </Heading>
                    <Text color={'gray.500'}>Viaje com o Rei 2022</Text>
                  </Stack>

                  <Stack direction={'row'} justify={'center'} spacing={6}>
                    <Stack spacing={0} align={'center'}>
                      <Text fontWeight={600}>{name}</Text>
                      <Text fontSize={'sm'} color={'gray.500'}>
                        {phoneNumber}
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Center>
          </Flex>
        ))}
      </Flex>

      <Flex h="100vh" justifyContent="center" alignItems="center">
        <Button
          // {...props}
          /* flex={1} */
          px={4}
          fontSize={'sm'}
          rounded={'full'}
          bg={'orange.400'}
          color={'white'}
          boxShadow={
            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
          }
          _hover={{
            bg: 'orange.500',
          }}
          _focus={{
            bg: 'orange.500',
          }}
          onClick={() => window.print()}
        >
          Imprimir
        </Button>
      </Flex>
    </Flex>
  );
}
