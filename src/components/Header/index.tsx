import { Box, Flex, FlexProps, useBreakpointValue } from '@chakra-ui/react';
import { Navbar } from '../Navbar';

import fundoHome from '../../assets/rioquente/4.jpg';
import Infos from './Infos';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  }) as boolean;

  // Define estilos base e estilos condicionais
  const flexStyle: FlexProps = {
    mt: '0.1rem',
    bgImage: fundoHome,
    bgSize: 'cover',
    bgRepeat: 'no-repeat',
    bgPosition: 'center',
    justifyContent: 'flex-end',
    // alignItems: 'flex-start',
    height: '90vh',
    // height: isWideVersion ? '75rem' : '72rem',
    position: 'relative',
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
    <Box>
      <Box boxShadow="dark-lg">
        <Navbar />
      </Box>

      {/* @ts-ignore */}
      <Flex {...flexStyle}>
        {/* Sobreposição para esmaecer a imagem de fundo */}
        <Box {...overlayStyle} />
        <Infos />
      </Flex>
    </Box>
  );
}
