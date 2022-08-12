import {
  Box,
  Container,
  Flex,
  Img,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Navbar } from '../Navbar';

import fundoHome from '../../assets/funHome2.png';
import Infos from './Infos';
// import styles from './Header.module.css';

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
        bgPosition={isWideVersion ? 'center' : 'right'}
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
