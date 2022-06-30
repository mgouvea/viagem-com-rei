import {
  Box,
  chakra,
  Container,
  Img,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { ReactNode } from 'react';

import logo from '../../assets/logoSvg.svg';
import { Link as ReactRouter } from 'react-router-dom';

const currentTime = new Date();
const year = currentTime.getFullYear();

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Img src={logo} w="9rem" />
        <Stack direction={'row'} spacing={6}>
          <Link as={ReactRouter} to={'/'}>
            Home
          </Link>
          <Link as={ReactRouter} to={'/Jeri'}>
            Prêmios
          </Link>
          <Link as={ReactRouter} to={'/Pacotes'}>
            Pacotes
          </Link>
          <Link as={ReactRouter} to={'/'}>
            Doação
          </Link>
          <Link as={ReactRouter} to={'/'}>
            Comprar bilhete
          </Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© {year} Viaje com o Rei. Todos os direitos reservados</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Whatsapp'} href={'#'}>
              <FaWhatsapp />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
