import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Img,
  Text,
  Divider,
  useClipboard,
  FormHelperText,
} from '@chakra-ui/react';

import { firstName, lastName, cpfMask, phoneMask } from '../../utils/mask';
import { Link as ReactRouter } from 'react-router-dom';

// import { format, formatDistanceToNow } from 'date-fns';
// import ptBR from 'date-fns/locale/pt-BR';

import pixImg from '../../assets/pix.svg';
// import logoY from '../../assets/logoYellow.png';
import cpSegura from '../../assets/cpSegura.png';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { pix } from '../../services/pix';
import { pixResponse } from '../../services/pixResponse';

export function Content() {
  const [value, setValue] = useState(0);
  const [qtd, setQtd] = useState(1);
  const [ticket, setTicket] = useState(0);
  const [hasPix, sethasPix] = useState(false);

  const [dataQR, setDataQR] = useState();
  const [dataPastePix, setDataPastePix] = useState('');
  // const [expiration, setExpiration] = useState<Date>(new Date());
  const [urlPayment, setUrlPayment] = useState('');

  const { hasCopied, onCopy } = useClipboard(dataPastePix);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    // TEST
    window.location.pathname === '/Checkout'
      ? (setValue(1), setTicket(5))
      : window.location.pathname === '/Checkout30'
      ? (setValue(1), setTicket(3))
      : (setValue(1), setTicket(1));

    if (hasPix) {
      window.open(`${urlPayment}`, '_blank');
    }

    // PROD
    // window.location.pathname === '/Checkout'
    //   ? (setValue(50), setTicket(5))
    //   : window.location.pathname === '/Checkout30'
    //   ? (setValue(30), setTicket(3))
    //   : (setValue(20), setTicket(1));
  }, [window.location.pathname, hasPix]);

  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  };

  const handlePix = async () => {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
    };

    let luckyNumber = [];
    for (let i = 0; i < ticket; i++) {
      luckyNumber.push(getRandom(2000, 3000));
    }
    Checkbox;

    const response = await pix
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
        setDataQR(
          response.data.point_of_interaction.transaction_data.qr_code_base64
        );
        setDataPastePix(
          response.data.point_of_interaction.transaction_data.qr_code
        );
        setUrlPayment(
          response?.data.point_of_interaction.transaction_data.ticket_url
        );

        sethasPix(true);

        console.log(
          'respo-THEN',
          response?.data?.point_of_interaction?.transaction_data?.ticket_url
        );
        return response.data;
      })
      .catch(function (error) {
        console.error('err', error);
      });

    // if (response?.status === 'pending') {
    //   const responseWebHooks = await pixResponse
    //     .get(`/${response?.id}/events`)
    //     .then(function (resp: any) {
    //       console.log(resp);
    //     })
    //     .catch(function (err: any) {
    //       console.error(err);
    //     });
    //   // .then(function () {
    //   //   // sempre será executado
    //   // });

    //   console.log('webhoook', responseWebHooks);
    // }

    // await api
    //   .post(
    //     '/',
    //     {
    //       name: name,
    //       email: email,
    //       phone: phone,
    //       luckyNumber: luckyNumber,
    //     },
    //     { headers }
    //   )
    //   .then(function (response) {
    //     console.log('resp', response);
    //   })
    //   .catch(function (error) {
    //     console.error('err', error);
    //   });
  };

  return (
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

        <Flex
          w="35rem"
          backgroundColor="gray.500"
          mr="5rem"
          color="white"
          direction={'column'}
        >
          {/* <Flex justify="center" mt="2rem" mb="3rem">
            <Img src={logoY} w="5rem" />
          </Flex> */}
          <Heading fontSize="xl" textAlign={'start'} pl="5rem" mt="2rem">
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
          {/* <Flex align="center" justify="center" mt="1rem">
            <Image
              w="12rem"
              src={dataQR ? `data:image/jpeg;base64,${dataQR}` : ''}
            />
          </Flex> */}
          {hasPix
            ? ''
            : // <Flex
              //   direction="column"
              //   mb={2}
              //   mt="1rem"
              //   align="center"
              //   justify="center"
              // >
              //   <Text fontSize={'xs'} mb="0.3rem">
              //     Ou copie nosso pix e pague no seu banco!
              //   </Text>
              //   <Input
              //     w="25rem"
              //     value={dataPastePix}
              //     isReadOnly
              //     placeholder="Welcome"
              //   />
              //   <Button onClick={onCopy} ml={2} colorScheme="blues" mt="0.5rem">
              //     {hasCopied ? 'Copiado' : 'Copiar'}
              //   </Button>
              //   {/* <Flex
              //     direction={'column'}
              //     fontSize="sm"
              //     align={'center'}
              //     color="gray.300"
              //   >
              //     <Text>Informações importantes</Text>
              //     <Text>
              //       Pague seu pix até{' '}
              //     </Text>
              //   </Flex> */}
              // </Flex>
              null}
        </Flex>
      </Flex>
      <Flex justify={'center'} mt="1rem">
        <Img src={cpSegura} w="25rem" />
      </Flex>
    </>
  );
}
