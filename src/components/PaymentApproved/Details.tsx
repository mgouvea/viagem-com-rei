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

interface DetailsProps {
  name?: string;
  numbers?: Array<number>;
}

export function Details({ name, numbers }: DetailsProps) {
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
              Parabéns {name}, seu pagamento foi aprovado!
            </Heading>
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
                Você já está concorrendo aos prêmios mensais e aos prêmios
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
                {numbers?.map((n, i) => (
                  <List key={i} spacing={2}>
                    <ListItem>{n}</ListItem>
                  </List>
                ))}
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
                  Viagem ida e volta para Alter do chão - PA
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    2° Prêmio principal:
                  </Text>{' '}
                  1 iPhone 12 de 128GB
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
