import { Box, Flex, Text } from '@chakra-ui/react';
import { Navbar } from '../Navbar';
import { Content } from './Content';

export function Checkout() {
  return (
    <Flex direction="column" bg="gray.100" h="100vh">
      <Navbar />

      <Box>
        <Content />
      </Box>
    </Flex>
  );
}
