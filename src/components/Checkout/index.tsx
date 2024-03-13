import { Box, Flex, Text } from '@chakra-ui/react';
import { Navbar } from '../Navbar';
import { NewCheckout } from './NewCheckout';
import { useParams } from 'react-router-dom';

export function Checkout() {
  const { id } = useParams();

  return (
    <Flex direction="column" bg="gray.100" h="100vh">
      <Navbar />

      <Box>
        <NewCheckout pacote={id} />
      </Box>
    </Flex>
  );
}
