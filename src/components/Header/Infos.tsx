import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Infos() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  let navigate = useNavigate();

  return (
    <Stack direction={{ base: 'column', md: 'row' }} zIndex={2}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
              color="#f6f6f6"
            >
              Promoção
            </Text>
            <br />{' '}
            <Text
              color={'blue.300'}
              as={'span'}
              textShadow="0 0 1px #364855, 0 0 1px #364855"
            >
              Viaje com Rei
            </Text>{' '}
          </Heading>
          <Box bg="rgba(6, 78, 59, 0.1)" zIndex={1} borderRadius="xl">
            <Text
              fontSize={{ base: 'md', lg: 'xl' }}
              color={'white'}
              fontWeight={'bold'}
              letterSpacing={0.5}
              textShadow="0 0 1px #364855, 0 0 1px #364855"
            >
              Sua oportunidade de contribuir com as benfeitorias do Núcleo Rei
              Hoasqueiro e ainda concorrer a um pacote turístico de 4 diárias
              para 5 pessoas no Rio Quente Resorts e a um iPhone 13, além de
              diversos outros prêmios mensais.
            </Text>
          </Box>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'blue.700'}
              border="1px solid #4299e1"
              color={'white'}
              _hover={{
                bg: 'blue.600',
                transition: 'all 0.3s ease',
                transform: 'scale(1.05)',
              }}
              onClick={() => navigate('/Planos')}
            >
              Comprar bilhete
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
