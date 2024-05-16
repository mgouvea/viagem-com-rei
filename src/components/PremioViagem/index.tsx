import {
  Container,
  Stack,
  Box,
  Heading,
  Text,
  Button,
  useBreakpointValue,
  FlexProps,
} from '@chakra-ui/react';
import { Navbar } from '../Navbar';

import fundoViagem from '../../assets/rioquente/6.jpg';
import { useNavigate } from 'react-router-dom';
import { Iphone } from './iphone';

import { Viagem } from './viagem';

export function PremioViagem() {
  let navigate = useNavigate();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const overlayStyle: FlexProps = {
    position: 'absolute',
    width: 'full',
    height: 'full',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 1,
  };

  return (
    <>
      <Navbar />
      <Box
        mt="0.1rem"
        bgImage={fundoViagem}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center"
        height={isWideVersion ? '80vh' : '100vh'}
        justifyContent="flex-end"
        position={'relative'}
        zIndex={1}
      >
        <Box {...overlayStyle} />
        <Container maxW={isWideVersion ? '7xl' : '5xl'}>
          <Stack
            align={isWideVersion ? 'center' : ''}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: '5rem' }}
            direction={{ base: 'column', md: 'row' }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }} zIndex={5}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              >
                <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    height: '30%',
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'green.400',
                    zIndex: -1,
                  }}
                  color="white"
                >
                  Viaje com Rei
                </Text>
                <br />
                <Text as={'span'} color={'green.300'}>
                  Rio Quente Resorts
                </Text>
              </Heading>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: 'column', sm: 'row' }}
                align={isWideVersion ? '' : 'center'}
              >
                <Button
                  rounded={'full'}
                  fontWeight={'normal'}
                  w={isWideVersion ? '22rem' : '16rem'}
                  px={6}
                  colorScheme={'green'}
                  bg={'green.400'}
                  _hover={{ bg: 'green.500' }}
                  onClick={() => navigate('/Planos')}
                >
                  Comprar bilhete
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box>
        <Viagem />
      </Box>
      <Box>
        <Iphone />
      </Box>
    </>
  );
}
