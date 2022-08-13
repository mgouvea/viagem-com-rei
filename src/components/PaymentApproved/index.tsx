import { Box, Flex, Text } from '@chakra-ui/react';
import { Navbar } from '../Navbar';
import { Card } from './Card';

export function PaymentApproved() {
  return (
    <Flex direction="column" bg="gray.100" h="100vh">
      <Navbar />

      <Flex direction={'column'} justify={'center'} align="center" h="100%">
        <Text>Pagamento Aprovado!</Text>
        <Flex>
          <Card />
        </Flex>
      </Flex>
    </Flex>
  );
}
