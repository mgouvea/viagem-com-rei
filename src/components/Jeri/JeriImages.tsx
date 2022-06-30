import {
  Box,
  chakra,
  Flex,
  Img,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';

import jeriFotos1 from '../../assets/jeri2.jpg';
import jeriFotos2 from '../../assets/jeri3.jpg';

interface StatsCardProps {
  title: string;
  stat: string;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <StatLabel fontWeight={'medium'}>{title}</StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default function JeriImages() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
        color="white"
      >
        Conheça esse lugar incrível!
      </chakra.h1>
      <Flex
        // columns={{ base: 1, md: 3 }}
        // spacing={{ base: 5, lg: 8 }}
        // border="1px solid red"
        justify="space-between"
      >
        {/* <StatsCard title={'We serve'} stat={'50,000 people'} />
        <StatsCard title={'Who speak'} stat={'100 different languages'} /> */}
        <Img
          src={jeriFotos1}
          w="40rem"
          px="1rem"
          mb="2rem"
          borderRadius={'8px'}
          overflow="hidden"
        />
        <Img
          src={jeriFotos2}
          w="40rem"
          px="1rem"
          mb="2rem"
          borderRadius={'8px'}
          overflow="hidden"
        />
      </Flex>
    </Box>
  );
}
