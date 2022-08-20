import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { api } from '../../services/api';

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  luckyNumber: number[];
}

export function Tables() {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const currentTime = new Date();
  const year = currentTime.getFullYear();

  const getAllUsers = async () => {
    try {
      const resp = await api.get('/users');
      setAllUsers(resp.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Flex>
        <Text>Tabelas</Text>
        <Flex m="0.3rem">
          <FiChevronRight />
        </Flex>
      </Flex>
      <Container maxW={'5xl'} mt="-5rem">
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
            lineHeight={'110%'}
          >
            Veja quem{' '}
            <Text as={'span'} color={'orange.400'}>
              está participando
            </Text>
          </Heading>
          <Flex w={'full'}>
            <TableContainer w="100%">
              <Table variant="striped" colorScheme={'blackAlpha'}>
                <TableCaption>Viaje com o Rei {year}</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th>Celular</Th>
                    <Th isNumeric>Números</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {allUsers.map((user: any, idx: any) => (
                    <Tr key={idx}>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.phone}</Td>
                      <Flex flexDirection={'column'}>
                        {user.luckyNumber.map((item: number) => (
                          <Td isNumeric>{item}</Td>
                        ))}
                      </Flex>
                    </Tr>
                  ))}
                </Tbody>
                {/* <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot> */}
              </Table>
            </TableContainer>
          </Flex>
        </Stack>
      </Container>
    </>
  );
}
