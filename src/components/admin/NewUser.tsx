import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Img,
  Text,
  FormErrorMessage,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  useBreakpointValue,
  useClipboard,
  useDisclosure,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';

import { cpfMask, phoneMask } from '../../utils/mask';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { api } from '../../services/api';

export function NewUser() {
  const toast = useToast();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  let navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [qtd, setQtd] = useState(1);

  const [ticket, setTicket] = useState(0);

  // Mercado pago states
  const [pixId, setPixId] = useState('');
  const [hasPix, sethasPix] = useState(false);
  const [dataQR, setDataQR] = useState();
  const [dataPastePix, setDataPastePix] = useState('');
  const [pixHasCreated, setPixHasCreated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const { hasCopied, onCopy } = useClipboard(dataPastePix);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [indicacao, setIndicacao] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [pagamento, setPagamento] = useState('');

  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);

  // Recebe tickets do BD
  const [getLuckyNumbers, setGetLuckyNumbers] = useState<number[]>([]);

  const [isPay, setIsPay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsEror] = useState(false);
  const isErrorName = name === '';
  const isErrorEmail = email === '';
  const isErrorIndicacao = indicacao === '';
  const isErrorPhone = phone === '';
  const isErrorCpf = cpf === '';
  const isErrorPacote = value === 0;
  const isErrorPagamento = pagamento === '';

  const getBDtNumbers = async () => {
    await api.get('/tickets').then((response) => {
      let tickets: any = [];
      for (const item of response?.data) {
        tickets = tickets.concat(item?.luckyNumbers);
      }

      setGetLuckyNumbers(tickets);
    });
  };

  const cleanFields = () => {
    setName('');
    setEmail('');
    setIndicacao('');
    setPhone('');
    setCpf('');
    setPagamento('');
    setValue(0);
    setQtd(1);
  };

  let luckyNumberTickets: number[] = [];
  const dateNow = moment(new Date()).format('DD/MM/YYYY');

  useEffect(() => {
    getBDtNumbers();
    // PROD
    if (value === 50) {
      setTicket(5);
    } else if (value === 30) {
      setTicket(2);
    } else {
      setTicket(1);
    }
  }, [value]);

  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  };

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  };

  const handleSave = async () => {
    // GERANDO NUMEROS E SALVANDO NO BANCO
    let luckyNumberUser: number[] = [];
    if (luckyNumberTickets.length >= 3999) {
      toast({
        title: 'Não há mais números disponíveis',
        position: 'top-right',
        status: 'error',
        isClosable: true,
      });
      return;
    } else {
      for (let i = 0; i < ticket * qtd; i++) {
        let num = getRandom(6000, 9999);
        do {
          num = getRandom(6000, 9999);
        } while (
          getLuckyNumbers.includes(num) ||
          luckyNumberTickets?.includes(num) ||
          luckyNumberUser?.includes(num)
        );

        // luckyNumberTickets.push(num);
        luckyNumberUser.push(num);
      }
    }
    setLuckyNumbers(luckyNumberUser.sort());

    await api
      .post(
        '/users',
        {
          name: name,
          email: email,
          indicacao: indicacao,
          phone: phone,
          luckyNumber: luckyNumberUser,
          package: value,
          data: dateNow,
          paymentStatus: pagamento,
          paymentId: '',
        },
        { headers }
      )
      // @ts-ignore
      .then(async function (response: UsersProps) {
        await api
          .post(
            `/tickets`,
            {
              luckyNumbers: luckyNumberUser,
              // @ts-ignore
              idUser: response?.data?._id!,
            },
            { headers }
          )
          .then(function (response) {
            cleanFields();
            pagamento === 'approved'
              ? toast({
                  title: 'Salvo com sucesso!',
                  description: 'O pagamento já foi realizado',
                  position: 'top-right',
                  status: 'success',
                  variant: 'left-accent',
                  duration: 8000,
                  isClosable: true,
                })
              : toast({
                  title: 'Salvo com sucesso',
                  description:
                    'Envie a chave pix para o pagamento ser realizado!',
                  position: 'top-right',
                  status: 'warning',
                  variant: 'left-accent',
                  duration: 8000,
                  isClosable: true,
                });
          })
          .catch(function (error) {
            toast({
              title:
                'seus números não foram salvos! Tente novamente mais tarde!',
              position: 'top-right',
              status: 'error',
              variant: 'left-accent',
              duration: 9000,
              isClosable: true,
            });
            console.error('err', error);
          });
      })
      .catch(function (error) {
        console.error('err', error);
      });
    setIsLoading(false);
  };

  return (
    <Flex minH={'79vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Flex align={'center'} justify="space-between">
            <Heading fontSize={'2xl'} color="green.400">
              Plano{' '}
              {value === 0
                ? ''
                : value === 20
                ? 'Bronze'
                : value === 30
                ? 'Prata'
                : 'Ouro'}
            </Heading>
            <Flex align={'center'}>
              <Text
                color="green.400"
                fontSize="md"
                fontWeight="bold"
                mr="0.5rem"
              >
                Qtd:
              </Text>
              <Button
                colorScheme={'blackAlpha'}
                onClick={() => setQtd(qtd - 1)}
                isDisabled={qtd <= 1}
              >
                -
              </Button>
              <Text
                color="green.400"
                fontSize="md"
                fontWeight="bold"
                mx="0.4rem"
              >
                {qtd}
              </Text>
              <Button
                colorScheme={'blackAlpha'}
                onClick={() => setQtd(qtd + 1)}
                isDisabled={qtd === 5}
              >
                +
              </Button>
            </Flex>
          </Flex>
          <Flex gap="0.5rem">
            <FormControl id="phone" isInvalid={isErrorPacote && isError}>
              <FormLabel>Plano:</FormLabel>
              <Select
                placeholder="Selecione"
                value={value}
                onChange={(event) => {
                  setValue(Number(event.target.value));
                }}
              >
                <option value={20}>Bronze</option>
                <option value={30}>Prata</option>
                <option value={50}>Ouro</option>
              </Select>
              {isErrorPacote ? (
                <FormErrorMessage>Plano é obrigatório.</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl id="cpf" isInvalid={isErrorPagamento && isError}>
              <FormLabel>Pagamento:</FormLabel>
              <Select
                placeholder="Selecione"
                value={pagamento}
                onChange={(event) => {
                  setPagamento(event.target.value);
                }}
              >
                <option value="approved">Aprovado</option>
                <option value="pending">Pendente</option>
              </Select>
              {isErrorPagamento ? (
                <FormErrorMessage>Pagamento é obrigatório.</FormErrorMessage>
              ) : null}
            </FormControl>
          </Flex>
          <FormControl id="name" isInvalid={isErrorName && isError}>
            <FormLabel>Nome completo:</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {isErrorName ? (
              <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl id="email" isInvalid={isErrorEmail && isError}>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isErrorEmail ? (
              <FormErrorMessage>Email é obrigatório.</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl id="indicacao" isInvalid={isErrorIndicacao && isError}>
            <FormLabel>Indicado por:</FormLabel>
            <Input
              type="text"
              value={indicacao}
              onChange={(e) => setIndicacao(e.target.value)}
            />
            {isErrorEmail ? (
              <FormErrorMessage>Indicação é obrigatório.</FormErrorMessage>
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
                <FormErrorMessage>Celular é obrigatório.</FormErrorMessage>
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

          <Stack spacing={6}>
            <Button
              colorScheme={'green'}
              variant={'solid'}
              isLoading={isLoading ? true : false}
              loadingText="Salvando..."
              onClick={(e) => {
                setIsLoading(true);
                if (
                  name === '' ||
                  email === '' ||
                  indicacao === '' ||
                  phone === '' ||
                  cpf === ''
                ) {
                  setIsEror(true);
                  return;
                }
                handleSave();
              }}
            >
              Salvar
            </Button>
            <Button
              colorScheme={'orange'}
              variant={'outline'}
              onClick={cleanFields}
            >
              Limpar
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
}
