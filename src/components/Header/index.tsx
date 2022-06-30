import { Box, Container, Flex, Img, Text } from '@chakra-ui/react';
import { Navbar } from '../Navbar';

import fundoHome from '../../assets/funHome2.png';
import Infos from './Infos';
// import styles from './Header.module.css';

export function Header() {
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
        bgPosition="center"
        align="center"
        justify="flex-start"
        height="75rem"
        justifyContent="flex-end"
      >
        <Infos />
      </Flex>
    </Box>
  );
}
