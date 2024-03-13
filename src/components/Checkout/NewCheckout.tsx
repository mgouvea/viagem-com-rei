// @ts-nocheck
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuUserCircle } from 'react-icons/lu';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { PiBroom } from 'react-icons/pi';
import { BsDatabaseAdd } from 'react-icons/bs';
import { PacotesCardComponent } from '../Pacotes/cards';
import { api } from '../../services/api';
import { cpfMask, phoneMask, removeCpfMask } from '../../utils/mask';
import { ca } from 'date-fns/locale';

interface ClientInterface {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export function NewCheckout({ pacote }: any) {
  const [qtd, setQtd] = useState(1);
  const [activeCadastro, setActiveCadastro] = useState<boolean>(false);

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');

  const [isError, setIsEror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPix, setIsLoadingPix] = useState(false);
  const [client, setClient] = useState<ClientInterface>();
  const [clientNumbers, setClientNumbers] = useState([] as number[]);

  const isErrorNome = nome === '';
  const isErrorEmail = email === '';
  const isErrorPhone = phone === '';
  const isErrorCpf = cpf === '';

  const toast = useToast();

  useEffect(() => {
    if (pacote === 50) {
      setQtd(5);
    } else if (pacote === 30) {
      setQtd(3);
    } else {
      setQtd(1);
    }
  }, []);

  const handleCheckEmail = async () => {
    const response = await api.get(`clients/by?email=${email}`);

    if (!response.data) {
      setActiveCadastro(true);
    }

    if (response.data) {
      const { id } = response.data;
      setClient(response.data);

      const buscarNumeros = await api.get(`tickets/${id}`);
      setClientNumbers(buscarNumeros.data.map((item) => item.numero));
    }

    setIsLoading(false);
  };

  const handleSaveClient = async () => {
    try {
      const response = await api.post('clients/new-client', {
        email,
        nome,
        phone,
        cpf: removeCpfMask(String(cpf)),
      });
      if (response?.data?.message === 'User with same CPF already exists') {
        toast({
          title: 'Erro',
          description: 'Esse CPF já está cadastrado!',
          position: 'top-right',
          isClosable: true,
          status: 'error',
        });
        return;
      } else {
        setClient(response.data);
        setActiveCadastro(false);
      }

      setIsLoadingPix(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCleanFields = () => {
    setEmail('');
    setClient(undefined);
    setClientNumbers([]);
    setActiveCadastro(false);
    setIsEror(false);
    setIsLoading(false);
    setIsLoadingPix(false);
    setNome('');
    setPhone('');
    setCpf('');
  };

  const height = 'calc(100vh - 80px)';
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      bg="#f8f8fa"
      paddingTop="3rem"
    >
      <Box h={height}>
        <Grid
          h="200px"
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(10, 1fr)"
          gap={4}
          marginInline="10rem"
        >
          <GridItem
            rowSpan={1}
            colSpan={6}
            border="1px solid #ccc"
            borderRadius="xl"
            padding="1rem"
          >
            <Stack>
              <Flex justify="flex-start" align="center" gap="0.5rem">
                <LuUserCircle size={25} />
                <Text fontSize="2xl">Dados Pessoais</Text>
              </Flex>
              <FormControl id="email" isInvalid={isErrorEmail && isError}>
                <FormLabel>Email:</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  isDisabled={client || activeCadastro}
                />
                {isErrorEmail ? (
                  <FormErrorMessage>Email é obrigatório.</FormErrorMessage>
                ) : null}
              </FormControl>
              <Stack spacing={6} paddingTop="1rem" align="flex-end">
                {!client && !activeCadastro && (
                  <Button
                    width="25%"
                    colorScheme={'orange'}
                    variant={'solid'}
                    isLoading={isLoading ? true : false}
                    loadingText=""
                    onClick={(e) => {
                      if (!email) {
                        setIsEror(true);
                        return;
                      }
                      setIsLoading(true);
                      handleCheckEmail();
                    }}
                    _hover={{
                      transition: 'all 0.3s ease',
                      transform: 'scale(1.09)',
                    }}
                    isDisabled={activeCadastro}
                  >
                    Continuar
                  </Button>
                )}
                {(client || activeCadastro) && (
                  <Tooltip label="Limpar">
                    <Box
                      _hover={{
                        transition: 'all 0.3s ease',
                        transform: 'scale(1.09)',
                        cursor: 'pointer',
                      }}
                      onClick={handleCleanFields}
                    >
                      <PiBroom size={25} color="#174d32" />
                    </Box>
                  </Tooltip>
                )}
              </Stack>
            </Stack>
          </GridItem>
          <GridItem colSpan={4}>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
              paddingTop="0.5rem"
            >
              <Flex flexDirection="column" h="60px">
                <Text fontSize="lg">Ação entre amigos</Text>
                <Heading fontWeight={600}>
                  <Text color="orange.500" fontSize="53xl">
                    Viaje com o Rei
                  </Text>
                </Heading>
              </Flex>
              <Box h="40px">
                <PacotesCardComponent pkt={pacote} qtd={qtd} />

                {client?.nome && (
                  <Flex
                    flexDirection="column"
                    border="1px solid #ccc"
                    borderRadius="lg"
                    gap="0.3rem"
                    padding="0.5rem"
                  >
                    <Text fontSize="xl">Bem vindo {client?.nome}</Text>
                    <Text fontSize="md">
                      Veja abaixo seus números da sorte:
                    </Text>
                    <Flex justify="center">
                      {clientNumbers.map((n, index) => (
                        <Text fontSize="lg" key={index} mr={2}>
                          {n},
                        </Text>
                      ))}
                    </Flex>
                  </Flex>
                )}
              </Box>
            </VStack>
          </GridItem>

          {client && (
            <GridItem
              rowSpan={1}
              colSpan={6}
              border="1px solid #ccc"
              borderRadius="xl"
              padding="1rem"
            >
              <Stack>
                <Flex justify="flex-start" align="center" gap="0.5rem">
                  <MdOutlineShoppingCartCheckout size={25} />
                  <Text fontSize="2xl">Comprar</Text>
                </Flex>
                <Text>Selecione a quantidade de bilhetes:</Text>
                <Flex align="center" justify="center" pt="1rem">
                  <Button
                    colorScheme={'blackAlpha'}
                    onClick={() => setQtd(qtd - 1)}
                    isDisabled={qtd <= 1}
                    w="3.5rem"
                    h="3.5rem"
                  >
                    -
                  </Button>
                  <Text
                    color="orange.500"
                    fontSize="2xl"
                    fontWeight="bold"
                    mx="0.4rem"
                    border="1px solid #ccc"
                    borderRadius="lg"
                    p="1rem"
                  >
                    {qtd}
                  </Text>
                  <Button
                    colorScheme={'blackAlpha'}
                    onClick={() => setQtd(qtd + 1)}
                    isDisabled={qtd === 5}
                    w="3.5rem"
                    h="3.5rem"
                  >
                    +
                  </Button>
                </Flex>
                <Stack spacing={6} paddingTop="1rem" align="flex-end">
                  <Button
                    width="25%"
                    colorScheme={'orange'}
                    variant={'solid'}
                    isLoading={isLoadingPix ? true : false}
                    loadingText=""
                    onClick={(e) => {
                      if (!email) {
                        setIsEror(true);
                        return;
                      }
                      setIsLoadingPix(true);
                      handleCheckEmail();
                    }}
                    _hover={{
                      transition: 'all 0.3s ease',
                      transform: 'scale(1.09)',
                    }}
                  >
                    Gerar Pix
                  </Button>
                </Stack>
              </Stack>
            </GridItem>
          )}

          {!client && activeCadastro && (
            <GridItem
              rowSpan={1}
              colSpan={6}
              border="1px solid #ccc"
              borderRadius="xl"
              padding="1rem"
            >
              <Stack>
                <Flex
                  justify="flex-start"
                  align="center"
                  gap="0.5rem"
                  mb="0.5rem"
                >
                  <BsDatabaseAdd size={25} />
                  <Text fontSize="xl">
                    Preencha seus dados para continuar a compra
                  </Text>
                </Flex>
                <FormControl id="nome" isInvalid={isErrorNome && isError}>
                  <FormLabel>Nome completo:</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setNome(e.target.value)}
                  />
                  {isErrorNome ? (
                    <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>
                  ) : null}
                </FormControl>
                <Flex gap="0.5rem">
                  <FormControl id="phone" isInvalid={isErrorPhone && isError}>
                    <FormLabel>Celular:</FormLabel>
                    <Input
                      type="text"
                      placeholder="(xx) xxxx-xxxx"
                      value={phoneMask(phone)}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {isErrorPhone ? (
                      <FormErrorMessage>
                        Celular é obrigatório.
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl id="cpf" isInvalid={isErrorCpf && isError}>
                    <FormLabel>CPF:</FormLabel>
                    <Input
                      type="text"
                      value={cpfMask(cpf)}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                    {isErrorCpf ? (
                      <FormErrorMessage>CPF é obrigatório.</FormErrorMessage>
                    ) : null}
                  </FormControl>
                </Flex>
                <Stack spacing={6} paddingTop="1rem" align="flex-end">
                  <Button
                    width="25%"
                    colorScheme={'orange'}
                    variant={'solid'}
                    isLoading={isLoading ? true : false}
                    loadingText=""
                    onClick={(e) => {
                      if (!email || !nome || !phone || !cpf) {
                        setIsEror(true);
                        return;
                      }
                      setIsLoadingPix(true);
                      handleSaveClient();
                    }}
                    _hover={{
                      transition: 'all 0.3s ease',
                      transform: 'scale(1.09)',
                    }}
                  >
                    Continuar
                  </Button>
                </Stack>
              </Stack>
            </GridItem>
          )}
        </Grid>
      </Box>
    </VStack>
  );
}
