import {
  Box,
  chakra,
  Container,
  Flex,
  Img,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
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
          <Link as={ReactRouter} to={'/'} style={{ textDecoration: 'none' }}>
            <Text _hover={{ color: 'orange.400' }}>Home</Text>
          </Link>
          <Link
            as={ReactRouter}
            to={'/Jeri'}
            style={{ textDecoration: 'none' }}
          >
            <Text _hover={{ color: 'orange.400' }}>Prêmios</Text>
          </Link>
          <Link
            as={ReactRouter}
            to={'/Pacotes'}
            style={{ textDecoration: 'none' }}
          >
            <Text _hover={{ color: 'orange.400' }}>Pacotes</Text>
          </Link>
          {/* <Link as={ReactRouter} to={'/'} style={{ textDecoration: 'none' }}>
            Doação
          </Link> */}
          <Link
            as={ReactRouter}
            to={'/Pacotes'}
            style={{ textDecoration: 'none' }}
          >
            <Text _hover={{ color: 'orange.400' }}>Comprar bilhete</Text>
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
          <Link
            as={ReactRouter}
            to={'/painel'}
            style={{ textDecoration: 'none' }}
          >
            <Text style={{ cursor: 'default' }} fontSize={'small'}>
              © {year} Viaje com o Rei. Todos os direitos reservados
            </Text>
          </Link>
          {/* <Text style={{ cursor: 'default' }} fontSize={'small'}>
            © {year} Viaje com o Rei. Todos os direitos reservados
          </Text> */}
          <Link
            href="https://wa.me/5561982107187?text=Ol%C3%A1+GouTech+Digital%2C+tenho+interesse+em+saber+mais+sobre+seu+trabalho%21"
            isExternal
            style={{ textDecoration: 'none' }}
          >
            <Text _hover={{ color: 'orange.400' }} fontSize={'small'}>
              Desenvolvido por GouTech Digital
            </Text>
          </Link>
        </Container>
      </Box>
    </Box>
  );
}
