import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react';

interface ItensProps {
  title: string;
  highlight: string;
  benefit1?: string;
  benefit2?: string;
  benefit3?: string;
  image: string;
}

export function Itens({
  title,
  highlight,
  benefit1,
  benefit2,
  benefit3,
  image,
}: ItensProps) {
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={250}
            width={282}
            objectFit={'contain'}
            src={image}
          />
          <Text color="red.400" fontSize="xs" my="0.2rem" textAlign="right">
            *Imagem meramente ilustrativa
          </Text>
        </Box>
        <Stack pt={12} align={'center'}>
          <Text color={'gray.600'} fontSize={'sm'} textTransform={'uppercase'}>
            {title}
          </Text>
          <Heading
            fontSize={'lg'}
            fontFamily={'body'}
            fontWeight={500}
            color="orange.400"
          >
            {highlight}
          </Heading>
          <Stack direction={'column'} align={'center'}>
            {benefit1 ? (
              <Text textDecoration={'none'} color={'gray.400'}>
                {benefit1}
              </Text>
            ) : (
              ''
            )}
            {benefit2 ? (
              <Text textDecoration={'none'} color={'gray.400'}>
                {benefit2}
              </Text>
            ) : (
              ''
            )}
            {benefit3 ? (
              <Text textDecoration={'none'} color={'gray.400'}>
                {benefit3}
              </Text>
            ) : (
              ''
            )}
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
