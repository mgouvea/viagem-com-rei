import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { Navbar } from '../Navbar';

// import fundoHome from '../../assets/alter/10.png';
import fundoHome from '../../assets/alter/12.jpg';
import Infos from './Infos';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box>
      <Box boxShadow="dark-lg">
        <Navbar />
      </Box>

      <Flex
        mt="0.1rem"
        bgImage={fundoHome}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition={isWideVersion ? 'center' : 'center'}
        align="center"
        justify="flex-start"
        height={isWideVersion ? '75rem' : '72rem'}
        justifyContent="flex-end"
      >
        <Infos />
      </Flex>
    </Box>
  );
}
