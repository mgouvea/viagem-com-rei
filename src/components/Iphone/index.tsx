import {
  Container,
  SimpleGrid,
  Image,
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
} from '@chakra-ui/react';
import { MdPhoneIphone, MdDevicesOther } from 'react-icons/md';
import { SiYourtraveldottv } from 'react-icons/si';
import { ReactElement } from 'react';

import iphone from '../../assets/rioquente/iphone13.png';

interface FeatureProps {
  text: string;
  list?: boolean;
  liArray?: string[];
  iconBg: string;
  icon?: ReactElement;
}

const ListItemArray: string[] = [
  ' Hotel Cristal (5 estrelas) - Suíte Master',
  '4 adultos e 1 criança até 11 anos',
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

export function Iphone() {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            2° Prêmio
          </Text>
          <Heading color="orange.400">1 iPhone 13</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Como segundo prêmio principal, será sorteado 1 iPhone 13 de 128GB.
            Além disso, teremos diversos prêmios que serão sorteados
            mensalmente.
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
            <Feature
              icon={<Icon as={MdPhoneIphone} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'1 iPhone 13'}
            />
            <Feature
              icon={
                <Icon as={MdDevicesOther} color={'purple.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Prêmios mensais'}
            />
          </Stack>
        </Stack>
        <Flex flexDirection={'column'}>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={iphone}
            objectFit={'cover'}
          />
          <Text textAlign={'right'} fontSize="xs" color="red.500">
            *Imagem meramente ilustrativa
          </Text>
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
