import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';

interface homeProps {
  nameUser: string;
}

export function Home({ nameUser }: homeProps) {
  return (
    <>
      <Flex>
        <Text>Home</Text>
        <Flex m="0.3rem">
          <FiChevronRight />
        </Flex>
        <Text color="orange.400">Bem Vindo {nameUser}</Text>
      </Flex>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Painel administrativo{' '}
            <Text as={'span'} color={'orange.400'}>
              Viaje com Rei
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            Aqui no painel administrativo da promoção Viaje com o Rei nós
            teremos os dados necessários e autorizados de pessoas que já
            compraram algum bilhete pelo site e, futuramente, um dashboard com
            os indicadores necessários para otimizar nossa promoção!
          </Text>
          {/* <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}
            >
              Get started
            </Button>
            <Button rounded={'full'} px={6}>
              Learn more
            </Button>
          </Stack> */}
          {/* <Flex w={'full'}>
            <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            />
          </Flex> */}
        </Stack>
      </Container>
    </>
  );
}
