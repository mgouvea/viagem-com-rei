import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Img,
  Text,
  Divider,
  useClipboard,
  useBreakpointValue,
} from '@chakra-ui/react';

import { firstName, lastName, cpfMask, phoneMask } from '../../utils/mask';
// import { Link as ReactRouter } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// import { format, formatDistanceToNow } from 'date-fns';
// import ptBR from 'date-fns/locale/pt-BR';

import pixImg from '../../assets/pix.svg';
// import logoY from '../../assets/logoYellow.png';
import cpSegura from '../../assets/cpSegura.png';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { pix } from '../../services/pix';
import { pixResponse } from '../../services/pixResponse';
import { PaymentApproved } from '../PaymentApproved';

export function Content() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [value, setValue] = useState(0);
  const [qtd, setQtd] = useState(1);
  const [ticket, setTicket] = useState(0);

  // Mercado pago states
  const [pixId, setPixId] = useState('');
  const [hasPix, sethasPix] = useState(false);
  const [dataQR, setDataQR] = useState();
  const [dataPastePix, setDataPastePix] = useState('');
  // const [expiration, setExpiration] = useState<Date>(new Date());
  // const [urlPayment, setUrlPayment] = useState('');
  const [pixHasCreated, setPixHasCreated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const { hasCopied, onCopy } = useClipboard(dataPastePix);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);

  // salva estado atual de tickets
  const [updateLuckyNumbers, setUpdateLuckyNumbers] = useState<number[]>([]);
  const [postLuckyNumbers, setPostLuckyNumbers] = useState<number[]>([]);

  // const [checkoutPathName, setCheckoutPathName] = useState('');
  const [isPay, setIsPay] = useState(false);

  const idTickets = '62fad70ed2b962e5cf148693';
  let luckyNumberTickets: number[] = [];

  async function getAllTickets() {
    try {
      const respTickets = await api.get('/tickets');
      setUpdateLuckyNumbers(respTickets?.data);
      console.log('respTickets', respTickets?.data);
      respTickets?.data.forEach((item: any) => {
        luckyNumberTickets.push(item?.luckyNumbers);
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllTickets();
    // TEST
    window.location.pathname === '/Checkout'
      ? (setValue(1), setTicket(5))
      : window.location.pathname === '/Checkout30'
      ? (setValue(1), setTicket(3))
      : (setValue(1), setTicket(1));

    // PROD
    // window.location.pathname === '/Checkout'
    //   ? (setValue(50), setTicket(5))
    //   : window.location.pathname === '/Checkout30'
    //   ? (setValue(30), setTicket(3))
    //   : (setValue(20), setTicket(1));
  }, [window.location.pathname, hasPix]);

  // let navigate = useNavigate();

  const handleWebHooks = async (id: string) => {
    try {
      if (pixId === '') {
        return;
      } else {
        const response = await pixResponse.get(`/${id}`);
        setPaymentStatus(response?.data?.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (pixHasCreated) {
      // console.log('luckyNumbers', postLuckyNumbers);
      // console.log('updateLuckyNumbers', updateLuckyNumbers);
      let interval = setInterval(() => {
        handleWebHooks(pixId);
      }, 20000);

      if (paymentStatus === 'pending') {
        setTimeout(() => {
          clearInterval(interval);
        }, 180000);
      } else if (paymentStatus === 'approved') {
        handleDataPost();
        setPixId('');
        setPixHasCreated(false);
        setIsPay(true);
        // navigate('/PaymentApproved');
      }

      return () => clearInterval(interval);
    }
  }, [pixHasCreated, paymentStatus]);

  // useEffect(() => {
  //   if (paymentStatus === 'approved') {
  //     clearInterval(webHookInterval());
  //   }
  // }, [paymentStatus]);

  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  };

  // pending
  //approved

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  };

  const handleDataPost = async () => {
    let luckyNumberUser: number[] = [];
    if (updateLuckyNumbers.length >= 1000) {
      console.log('Não há mais números disponíveis');
      return;
    } else {
      for (let i = 0; i < ticket; i++) {
        let num = getRandom(2000, 3000);
        do {
          num = getRandom(2000, 3000);
        } while (
          updateLuckyNumbers?.includes(num) ||
          luckyNumberTickets?.includes(num)
        );

        luckyNumberTickets.push(num);
        luckyNumberUser.push(num);
      }
    }
    setLuckyNumbers(luckyNumberUser.sort());
    console.log('éAgora', luckyNumberTickets);
    debugger;
    // let patchLuckyNumbers = luckyNumber.concat(updateLuckyNumbers);
    // let patchLuckyNumbers = luckyNumber.concat(
    //   updateLuckyNumbers.map((item) => {
    //     return item;
    //   })
    // );

    // let putLuckyNumbers = { ...luckyNumber, ...updateLuckyNumbers };

    await api
      .post(
        '/users',
        {
          name: name,
          email: email,
          phone: phone,
          luckyNumber: luckyNumberUser,
        },
        { headers }
      )
      .then(async function (response) {
        // console.log('resp', response);
        handlePutLuckyNumbers(luckyNumberTickets);
      })
      .catch(function (error) {
        console.error('err', error);
      });
  };

  const handlePutLuckyNumbers = async (array: Array<number>) => {
    return await api
      .put(`/tickets/${idTickets}`, {
        luckyNumbers: array,
      })
      .then(function (response) {
        console.log('resp', response);
      })
      .catch(function (error) {
        console.error('err', error);
      });
  };

  const handlePix = async () => {
    await pix
      .post(
        '/',
        {
          transaction_amount: value,
          payment_method_id: 'pix',
          payer: {
            first_name: firstName(name),
            last_name: lastName(name),
            email: email,
            identification: {
              type: 'CPF',
              number: cpf,
            },
          },
          description: 'Viaje com o rei',
        },
        { headers }
      )
      .then(function (response) {
        setPixId(response?.data.id);
        setDataQR(
          response.data.point_of_interaction.transaction_data.qr_code_base64
        );
        setDataPastePix(
          response.data.point_of_interaction.transaction_data.qr_code
        );
        // setUrlPayment(
        //   response?.data.point_of_interaction.transaction_data.ticket_url
        // );
        sethasPix(true);
        setPixHasCreated(true);

        return response.data.send(200);
      })
      .catch(function (error) {
        console.error('err', error);
      });
  };

  return !isPay ? (
    <>
      <Flex minH={'79vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Flex align={'center'} justify="space-between">
              <Heading fontSize={'2xl'} color="orange.400">
                Pacote {value}
              </Heading>
              <Text>Qtd: {qtd}</Text>
            </Flex>
            <FormControl id="name">
              <FormLabel>Nome completo:</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email:</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <Flex gap="0.5rem">
              <FormControl id="phone">
                <FormLabel>Celular:</FormLabel>
                <Input
                  type="text"
                  placeholder="(xx) xxxx-xxxx"
                  value={phoneMask(phone)}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
              <FormControl id="cpf">
                <FormLabel>CPF:</FormLabel>
                <Input
                  type="text"
                  value={cpfMask(cpf)}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormControl>
            </Flex>
            <Stack spacing={6}>
              <Button
                colorScheme={'orange'}
                variant={'solid'}
                onClick={(e) => {
                  handlePix();
                }}
              >
                Gerar Pix
              </Button>
            </Stack>

            <Flex justify={'center'}>
              <Img src={pixImg} w="5rem" />
            </Flex>
          </Stack>
        </Flex>

        {/* ABA LATERAL  QRCODE  */}
        <Flex
          w={isWideVersion ? '35rem' : '100%'}
          height={isWideVersion ? '' : '100%'}
          backgroundColor="gray.500"
          mr="5rem"
          color="white"
          direction={'column'}
        >
          {/* <Flex justify="center" mt="2rem" mb="3rem">
            <Img src={logoY} w="5rem" />
          </Flex> */}
          <Heading
            fontSize={isWideVersion ? 'xl' : '2xl'}
            textAlign={isWideVersion ? 'start' : 'center'}
            pl={isWideVersion ? '5rem' : ''}
            mt="2rem"
          >
            Resumo da compra
          </Heading>
          <Divider mt="1.5rem" w="25rem" mx="auto" />
          <Flex
            direction={'row'}
            justify="space-between"
            px="6rem"
            mt="1rem"
            color="gray.300"
          >
            <Text>Produto:</Text>

            <Text>
              {qtd} Pacote {value}
            </Text>
          </Flex>
          <Flex justify={'space-between'} px="5rem" mt="1.3rem">
            <Heading fontSize={'xl'}>Você pagará:</Heading>
            <Text fontSize="xl" color="white" fontWeight="bold">
              R$ {value}
            </Text>
          </Flex>
          <Divider mt="1rem" w="25rem" mx="auto" />
          <Flex align="center" justify="center" mt="1rem">
            <Image
              w="12rem"
              src={dataQR ? `data:image/jpeg;base64,${dataQR}` : ''}
            />
          </Flex>
          {hasPix ? (
            <Flex
              direction="column"
              mb={2}
              mt="1rem"
              align="center"
              justify="center"
            >
              <Text fontSize={isWideVersion ? 'xs' : 'md'} mb="0.3rem">
                {isWideVersion
                  ? 'Ou copie nosso pix e pague no seu banco!'
                  : 'Copie nossa chave pix e pague no seu banco!'}
              </Text>
              <Input
                w={isWideVersion ? '25rem' : '20rem'}
                value={dataPastePix}
                isReadOnly
                // placeholder="Welcome"
              />
              <Button
                onClick={onCopy}
                ml={2}
                w={isWideVersion ? '' : '7rem'}
                fontSize={isWideVersion ? '' : 'lg'}
                colorScheme="orange"
                mt={isWideVersion ? '0.5rem' : '1rem'}
                mb={isWideVersion ? '' : '0.5rem'}
              >
                {hasCopied ? 'Copiado' : 'Copiar'}
              </Button>
              {/* <Flex
                  direction={'column'}
                  fontSize="sm"
                  align={'center'}
                  color="gray.300"
                >
                  <Text>Informações importantes</Text>
                  <Text>
                    Pague seu pix até{' '}
                  </Text>
                </Flex> */}
            </Flex>
          ) : null}
        </Flex>
      </Flex>
      <Flex justify={'center'} mt="1rem">
        <Img src={cpSegura} w="25rem" />
      </Flex>
    </>
  ) : (
    <PaymentApproved
      name={firstName(name)}
      phoneNumber={phone}
      number={luckyNumbers}
    />
  );
}
