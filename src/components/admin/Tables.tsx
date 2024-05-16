import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  useToast,
  Box,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useBreakpointValue,
  Img,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { SiCodereview } from 'react-icons/si';
import { BsSendCheck } from 'react-icons/bs';
import {
  MdOutlineSentimentDissatisfied,
  MdSentimentVerySatisfied,
} from 'react-icons/md';
import { api } from '../../services/api';
import { pixResponse } from '../../services/pixResponse';
import { ViewCard } from './ViewCard';
import { EditDataCard } from './EditDataCard';

import xlsImg from '../../assets/xls.png';

export interface UsersProps {
  name: string;
  email: string;
  indicacao: string;
  phone: string;
  luckyNumber: Array<number>;
  package: number;
  data: string;
  paymentStatus: string;
  paymentId: string;
  _id?: any;
}

export function Tables() {
  const [allUsers, setAllUsers] = useState<UsersProps[]>([]);
  const [allTickets, setAllTickets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [rowClicked, setRowClicked] = useState({});
  const [deleteClick, setDeleteClick] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  };

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const resp = await api.get('/users');
      setAllUsers(resp.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
      toast({
        title:
          'Ocorreu um erro ao buscar os dados! Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
      console.log(e);
    }
  };

  const getTickets = async () => {
    try {
      const resp = await api.get('/tickets');
      setAllTickets(resp.data);
      console.log(resp.data);
    } catch (e) {
      setIsError(true);
      toast({
        title:
          'Ocorreu um erro ao buscar os numeros! Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
      console.log(e);
    }
  };

  useEffect(() => {
    getAllUsers();
    getTickets();
  }, [updateTable]);

  const openModalViewOrEdit = (isEditing?: boolean, user?: UsersProps) => {
    setRowClicked(user!);
    if (!!isEditing) {
      setIsEditing(isEditing);
      onOpen();
    } else {
      setIsEditing(isEditing!);
      onOpen();
    }
  };

  const handleCloseEdit = (edited?: boolean) => {
    if (!!edited) {
      setUpdateTable(!updateTable);
      onClose();
    } else {
      onClose();
    }
  };

  const OpenModal = (row: any) => {
    return (
      <Modal isOpen={isOpen} onClose={() => handleCloseEdit(isEditing)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!!isEditing ? 'Editar inscrição' : 'Ver Inscrição'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isEditing ? (
              <EditDataCard dataUser={row} />
            ) : (
              <ViewCard dataUser={row} />
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => handleCloseEdit(isEditing)}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const handleDeleteClick = async (row: any) => {
    const ticketToDelete = allTickets
      .map((ticket: any) => ticket)
      .filter((t: any) => t.idUser === row);

    await api
      .delete(`/tickets/${ticketToDelete[0]._id}`)
      .then(() => {
        console.log('Ticket deletado com sucesso');
      })
      .catch((err) => {
        console.log('Ocorreu um erro ao deletar o ticket');
      });

    await api
      .delete(`/users/${row}`)
      .then(() => {
        toast({
          title: 'Sucesso',
          description: 'Item deletado com sucesso',
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });

        setUpdateTable(!updateTable);
      })
      .catch(() => {
        toast({
          title: 'Erro',
          description: 'Não foi possível excluir este item!',
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  const handleGetPagamento = async (row: UsersProps) => {
    await pixResponse
      .get(`/${row.paymentId}`)
      .then((response) => {
        if (response?.data?.status === 'approved') {
          api
            .patch(
              `/users/${row?._id}`,
              { paymentStatus: 'approved' },
              { headers }
            )
            .then(() => {
              toast({
                title: 'Sucesso',
                description: 'Pagamento verificado com sucesso',
                status: 'success',
                duration: 8000,
                isClosable: true,
                position: 'top-right',
              });
            })
            .catch((err) => {
              console.log('Error', err);
            });
        } else {
          toast({
            title: 'Pagamento não realizado',
            description:
              'O pagamento ainda não foi realizado, entre em contato com o participante!',
            status: 'warning',
            duration: 8000,
            isClosable: true,
            position: 'top-right',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Tente novamente mais tarde',
          description: 'Não foi possível verificar o pagamento!',
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  const currentTime = new Date();
  const year = currentTime.getFullYear();

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
          <Tooltip label="Download XLS">
            <Flex cursor="pointer">
              <Img src={xlsImg} w="4rem" />
            </Flex>
          </Tooltip>

          <Flex w={'full'}>
            <TableContainer w="100%">
              <Table variant="striped" colorScheme={'blackAlpha'}>
                <TableCaption>Viaje com Rei {year}</TableCaption>

                {isLoading ? (
                  <Flex justify={'center'}>
                    <Spinner
                      thickness="2px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </Flex>
                ) : (
                  <>
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Celular</Th>
                        <Th>Pagamento</Th>
                        <Th>Pacote</Th>
                        {/* <Th isNumeric>Numeros</Th> */}
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {allUsers.map((user: UsersProps, idx: any) => {
                        return (
                          <Tr key={idx}>
                            <Td>{user.name}</Td>
                            <Td>{user.phone}</Td>
                            <Td>
                              {user.paymentStatus === 'approved' ? (
                                <MdSentimentVerySatisfied
                                  size={20}
                                  color="#148a08"
                                />
                              ) : (
                                <MdOutlineSentimentDissatisfied
                                  size={20}
                                  color="#ed8936"
                                />
                              )}
                            </Td>
                            <Td>
                              {user.package == 20 ? (
                                <Heading
                                  display="inline-block"
                                  as="h2"
                                  size="sm"
                                  bgGradient="linear(to-r, #FFCD97, #DA9D5C)"
                                  backgroundClip="text"
                                >
                                  Bronze
                                </Heading>
                              ) : user.package == 30 ? (
                                <Heading
                                  display="inline-block"
                                  as="h2"
                                  size="sm"
                                  bgGradient="linear(to-r, #D3D3D3, #6E7685)"
                                  backgroundClip="text"
                                >
                                  Prata
                                </Heading>
                              ) : (
                                <Heading
                                  display="inline-block"
                                  as="h2"
                                  size="sm"
                                  bgGradient="linear(to-r, #FFD860, #C29200)"
                                  backgroundClip="text"
                                >
                                  Ouro
                                </Heading>
                              )}
                            </Td>

                            <Td>
                              <Flex justify="space-between">
                                <Tooltip label="Ver mais">
                                  <Box
                                    onClick={() =>
                                      openModalViewOrEdit(false, user)
                                    }
                                    cursor="pointer"
                                  >
                                    <SiCodereview size={20} color="#47b1dc" />
                                  </Box>
                                </Tooltip>
                                {user?.paymentId === '' ? (
                                  <Tooltip label="Inserido manualmente">
                                    <Box cursor="not-allowed">
                                      <BsSendCheck size={20} color="#ccc" />
                                    </Box>
                                  </Tooltip>
                                ) : (
                                  <Tooltip label="Verificar pagamento">
                                    <Box
                                      onClick={() => handleGetPagamento(user)}
                                      cursor="pointer"
                                    >
                                      <BsSendCheck size={20} color="#148a08" />
                                    </Box>
                                  </Tooltip>
                                )}

                                <Tooltip label="Editar">
                                  <Box
                                    onClick={() =>
                                      openModalViewOrEdit(true, user)
                                    }
                                    cursor="pointer"
                                  >
                                    <FaRegEdit size={20} color="#ed8936" />
                                  </Box>
                                </Tooltip>
                                <Tooltip label="Excluir">
                                  <Box
                                    onClick={() => handleDeleteClick(user?._id)}
                                    cursor="pointer"
                                  >
                                    <RiDeleteBin5Line
                                      size={20}
                                      color="#f70000"
                                    />
                                  </Box>
                                </Tooltip>
                              </Flex>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </>
                )}
              </Table>
            </TableContainer>
          </Flex>
        </Stack>
        {OpenModal(rowClicked)}
      </Container>
    </>
  );
}
