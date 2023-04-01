import { Flex, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { removeChar } from '.';

interface homeProps {
  nameUser: string;
}

export function Home({ nameUser }: homeProps) {
  console.log(nameUser);
  return (
    <>
      <Flex>
        <Text>Home</Text>
        <Flex m="0.3rem">
          <FiChevronRight />
        </Flex>
        <Text color="orange.400">Bem vindo</Text>
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
            teremos futuramente um dashboard com os indicadores necessários para
            otimizar nossa promoção. Aproveite e acesse no menu lateral a tabela
            de participantes!
          </Text>
        </Stack>
      </Container>
    </>
  );
}
