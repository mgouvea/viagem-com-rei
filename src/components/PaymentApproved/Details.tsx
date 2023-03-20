import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  useBreakpointValue,
} from '@chakra-ui/react';

import iconApproved from '../../assets/iconApproved.jpg';

export function Details() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        {isWideVersion ? (
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              // src={
              //   'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
              // }
              src={iconApproved}
              fit={'contain'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
        ) : (
          ''
        )}
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              color={'orange.400'}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              Parabéns, seu pagamento foi aprovado!
            </Heading>
            {/* <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              $350.00 USD
            </Text> */}
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}
              >
                Nós do Núcleo Rei Hosqueiro ficamos feliz em ter você fazendo
                parte da nossa história
              </Text>
              <Text fontSize={'lg'}>
                Você já está concorrendo aos prêmios mensais e prêmios
                principais. Veja abaixo seus números da sorte.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Seus números
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{' '}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Detalhes da promoção
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    1° Prêmio principal:
                  </Text>{' '}
                  Viagem ida e volta para Alter do chão - PA (2 pessoas)
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    2° Prêmio principal:
                  </Text>{' '}
                  1 Iphone de última geração
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Prêmios mensais:
                  </Text>{' '}
                  Além dos prêmios principais, você concorre a diversos prêmios
                  sorteados mensalmente.
                </ListItem>
              </List>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
