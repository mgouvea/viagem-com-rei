import {
  Button,
  Flex,
  Heading,
  Image,
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
    <Stack
      // minH={'100vh'}
      direction={{ base: 'column', md: 'row' }}
      mt="-37rem"
      // border="1px solid red"
    >
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
              color="white"
            >
              Promoção
            </Text>
            <br />{' '}
            <Text color={'yellow.300'} as={'span'}>
              Viaje com o Rei
            </Text>{' '}
          </Heading>
          <Text
            fontSize={{ base: 'md', lg: 'lg' }}
            color={'white'}
            fontWeight={isWideVersion ? '' : 'bold'}
          >
            Sua oportunidade de contribuir com as benfeitorias do Núcleo Rei
            Hoasqueiro e ainda concorrer a um pacote turístico de 5 dias para
            Jericoacoara - CE, um Iphone de última geração e diversos prêmios
            mensais.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'yellow.500'}
              color={'white'}
              _hover={{
                bg: 'yellow.400',
              }}
              onClick={() => navigate('/Pacotes')}
            >
              Comprar bilhete
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
