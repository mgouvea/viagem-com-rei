import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  useBreakpointValue,
  FlexProps,
} from '@chakra-ui/react';
import { Navbar } from '../Navbar';

import fundoViagem from '../../assets/rioquente/6.jpg';
import { useNavigate } from 'react-router-dom';
import { Iphone } from '../Iphone';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import img2 from '../../assets/rioquente/2.jpg';
import img3 from '../../assets/rioquente/3.jpg';
import img4 from '../../assets/rioquente/4.jpg';
import img5 from '../../assets/rioquente/5.jpg';
import img6 from '../../assets/rioquente/6.jpg';
import img7 from '../../assets/rioquente/7.jpg';

export function PremioViagem() {
  let navigate = useNavigate();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const arrayImages = [img2, img3, img4, img5, img6, img7];

  const CarouselContainer = (img: string, index: number) => {
    return (
      <Box key={index}>
        <img src={img} />
      </Box>
    );
  };

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
        height="80vh"
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
                    bg: 'red.400',
                    zIndex: -1,
                  }}
                  color="white"
                >
                  Viaje com o Rei
                </Text>
                <br />
                <Text as={'span'} color={'red.400'}>
                  Rio Quente Resorts
                </Text>
              </Heading>
              <Text
                color={'gray.50'}
                fontWeight="semibold"
                fontSize="1.1rem"
                textAlign={isWideVersion ? 'justify' : 'left'}
                w={isWideVersion ? '30rem' : '22rem'}
                letterSpacing={0.5}
              >
                Compre um bilhete e concorra a 4 diárias no Rio Quente Resorts -
                Hotel Cristal (5 estrelas) para 4 adultos e 1 crianças até 11
                anos, 1 iPhone 13 e diversos outros prêmios mensais.
              </Text>
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
                  colorScheme={'red'}
                  bg={'red.400'}
                  _hover={{ bg: 'red.500' }}
                  onClick={() => navigate('/Pacotes')}
                >
                  Comprar bilhete
                </Button>
              </Stack>
            </Stack>
            <Flex
              flex={1}
              justify={'center'}
              align={'center'}
              position={'relative'}
              w={'full'}
              zIndex={5}
            >
              <Box
                position={'relative'}
                rounded={'2xl'}
                boxShadow={'2xl'}
                width={isWideVersion ? '560' : '360'}
                height={isWideVersion ? '315' : '215'}
                overflow={'hidden'}
              >
                <Carousel
                  infiniteLoop
                  autoPlay
                  dynamicHeight
                  showArrows={false}
                >
                  {arrayImages.map((img, index) =>
                    CarouselContainer(img, index)
                  )}
                </Carousel>
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Box>
      <Box>
        <Iphone />
      </Box>
    </>
  );
}
