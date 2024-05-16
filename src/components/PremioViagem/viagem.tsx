import {
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
  ListItem,
  UnorderedList,
  useBreakpointValue,
  FlexProps,
} from '@chakra-ui/react';
import { SiYourtraveldottv } from 'react-icons/si';
import { ReactElement } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import img2 from '../../assets/rioquente/2.jpg';
import img3 from '../../assets/rioquente/3.jpg';
import img4 from '../../assets/rioquente/4.jpg';
import img5 from '../../assets/rioquente/5.jpg';
import img6 from '../../assets/rioquente/6.jpg';
import img7 from '../../assets/rioquente/7.jpg';

interface FeatureProps {
  text: string;
  list?: boolean;
  liArray?: string[];
  iconBg: string;
  icon?: ReactElement;
}

const ListItemArray: string[] = [
  ' Hotel Cristal (5 estrelas) - Suíte Master',
  '4 adultos e 1 criança (até 11 anos)',
  'Acesso ao Hot Park e Parque das Fontes',
  'Café da manhã e Almoço',
  'Translado ida e volta - Saíndo de Brasília ou Goiânia',
];

const Feature = ({ text, list, liArray, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Box>
        <Text fontWeight={600}>{text}</Text>
        {list && (
          <UnorderedList>
            {liArray?.map((li, index) => (
              <ListItem key={index}>{li}</ListItem>
            ))}
          </UnorderedList>
        )}
      </Box>
    </Stack>
  );
};

export function Viagem() {
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
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'green.500'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            1° Prêmio
          </Text>
          <Heading color="orange.400">4 diárias Rio Quente Resorts</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            O prêmio principal será quatro diárias no Rio Quente Resorts - Na
            cidade de Rio Quente - Goiás, no Hotel Cristal (5 estrelas) - Suíte
            Master, para 4 adultos e 1 criança até 11 anos, com acesso ao Hot
            Park e Parque das Fontes, café da manhã e almoço inclusos, translado
            ida e volta - Saíndo de Brasília ou Goiânia.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Feature
              icon={
                <Icon as={SiYourtraveldottv} color={'yellow.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'4 diárias Rio Quente Resorts '}
              list={true}
              liArray={ListItemArray}
            />
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
            <Carousel infiniteLoop autoPlay dynamicHeight showArrows={false}>
              {arrayImages.map((img, index) => CarouselContainer(img, index))}
            </Carousel>
          </Box>
        </Flex>
        {/* <Flex flexDirection={'column'}>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={iphone}
            objectFit={'cover'}
          />
          <Text textAlign={'right'} fontSize="xs" color="red.500">
            *Imagem meramente ilustrativa
          </Text>
        </Flex> */}
      </SimpleGrid>
    </Container>
  );
}
