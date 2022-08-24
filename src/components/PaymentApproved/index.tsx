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
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import home from '../../assets/funHome3.jpg';
import phone from '../../assets/iphone5.png';

interface ContentProps {
  name?: string;
  email?: string;
  phoneNumber?: string;
  number?: Array<number>;
  tickets?: number;
}

// const numberTeste = [2301,2302,2303,2304,2305]
// const phoneTeste = '(61) 98210-7187 '
// const nameTeste = 'Mateus Gouvêa '

export function PaymentApproved({
  name,
  phoneNumber,
  number,
  tickets,
  email,
}: ContentProps) {
  // const number = [2301, 1233, 3213];

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    onAfterPrint: () => console.log('success'),
  });

  return (
    <Flex direction="column" bg="gray.100" h="100vh">
      <Flex
        direction={'column'}
        justify={'top'}
        align="center"
        h="100%"
        pt="3rem"
      >
        <Text
          fontSize={isWideVersion ? '2xl' : 'xl'}
          w={isWideVersion ? '' : '15rem'}
          color="orange.400"
          fontWeight={'bold'}
        >
          Parabéns {name}, seu pagamento foi aprovado com sucesso
        </Text>
        <Text color="gray.400" mt="1rem">
          {tickets === 1
            ? 'Veja abaixo seu número da sorte'
            : 'Veja abaixo seus números da sorte'}
        </Text>
        <Flex direction={isWideVersion ? 'row' : 'column'} ref={componentRef}>
          {number?.map((num) => (
            <Flex px="1rem">
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
          onClick={handlePrint}
        >
          Imprimir
        </Button>
      </Flex>
    </Flex>
  );
}
