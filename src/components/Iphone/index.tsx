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
} from '@chakra-ui/react';
import { MdPhoneIphone, MdDevicesOther } from 'react-icons/md';
import { SiYourtraveldottv } from 'react-icons/si';
import { ReactElement } from 'react';

import iphone from '../../assets/iph.png';

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
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
      <Text fontWeight={600}>{text}</Text>
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
            2° Lugar
          </Text>
          <Heading color="orange.400">1 iPhone 12</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Como segundo prêmio principal, será sorteado 1 iPhone 12 de 128GB.
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
              text={'Viagem Alter do chão - PA'}
            />
            <Feature
              icon={<Icon as={MdPhoneIphone} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'1 iPhone 12'}
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
