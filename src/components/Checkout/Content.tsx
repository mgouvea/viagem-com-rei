import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Img,
  Text,
  Divider,
} from '@chakra-ui/react';

import pixImg from '../../assets/pix.svg';
import logoY from '../../assets/logoYellow.png';
import cpSegura from '../../assets/cpSegura.png';
import { useEffect, useState } from 'react';

export function Content() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    window.location.pathname === '/Checkout'
      ? setValue(50)
      : window.location.pathname === '/Checkout30'
      ? setValue(30)
      : setValue(20);
  }, [window.location.pathname]);
  return (
    <>
      <Flex minH={'79vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Flex align={'center'} justify="space-between">
              <Heading fontSize={'2xl'} color="orange.400">
                Pacote {value}
              </Heading>
              <Text>Qtd: 1</Text>
            </Flex>
            <FormControl id="email">
              <FormLabel>Nome completo:</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Email:</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Celular:</FormLabel>
              <Input type="number" />
            </FormControl>
            <Stack spacing={6}>
              <Button colorScheme={'orange'} variant={'solid'}>
                Gerar Pix
              </Button>
            </Stack>

            <Flex justify={'center'}>
              <Img src={pixImg} w="5rem" />
            </Flex>
          </Stack>
        </Flex>

        <Flex
          w="35rem"
          backgroundColor="gray.500"
          mr="5rem"
          color="white"
          direction={'column'}
        >
          <Flex justify="center" mt="2rem" mb="3rem">
            <Img src={logoY} w="5rem" />
          </Flex>
          <Heading fontSize="xl" textAlign={'center'}>
            Resumo da compra
          </Heading>
          <Divider mt="2rem" w="25rem" mx="auto" />
          <Flex
            direction={'row'}
            justify="space-between"
            px="6rem"
            mt="1rem"
            color="gray.300"
          >
            <Text>1 Pacote {value}</Text>

            <Text>R$ {value} reais</Text>
          </Flex>
          <Flex justify={'space-between'} px="5rem" mt="2rem">
            <Heading fontSize={'xl'}>Você pagará:</Heading>
            <Text fontSize="xl" color="white" fontWeight="bold">
              R$ {value}
            </Text>
          </Flex>
          <Divider mt="1rem" w="25rem" mx="auto" />
        </Flex>
      </Flex>
      <Flex justify={'center'} mt="0.5rem">
        <Img src={cpSegura} w="27rem" />
      </Flex>
    </>
  );
}
