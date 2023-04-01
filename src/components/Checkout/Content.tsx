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
  useToast,
  FormErrorMessage,
  Checkbox,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import { firstName, lastName, cpfMask, phoneMask } from '../../utils/mask';

import pixImg from '../../assets/pix.svg';
import cpSegura from '../../assets/cpSegura.png';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { pix } from '../../services/pix';
import { pixResponse } from '../../services/pixResponse';
import { PaymentApproved } from '../PaymentApproved';
import { useNavigate } from 'react-router-dom';

export function Content() {
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
  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);

  // salva estado atual de tickets
  const [updateLuckyNumbers, setUpdateLuckyNumbers] = useState<number[]>([]);
  const [postLuckyNumbers, setPostLuckyNumbers] = useState<number[]>([]);

  const [isPay, setIsPay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let luckyNumberTickets: number[] = [];

  useEffect(() => {
    // TEST
    // window.location.pathname === '/Checkout'
    //   ? (setValue(0.01), setTicket(5))
    //   : window.location.pathname === '/Checkout30'
    //   ? (setValue(1), setTicket(3))
    //   : (setValue(0.01), setTicket(1));

    // PROD
    window.location.pathname === '/Checkout'
      ? (setValue(50), setTicket(5))
      : window.location.pathname === '/Checkout30'
      ? (setValue(30), setTicket(2))
      : (setValue(20), setTicket(1));
  }, [window.location.pathname, hasPix]);

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
      let interval = setInterval(() => {
        handleWebHooks(pixId);
      }, 10000);

      if (paymentStatus === 'pending') {
        setTimeout(() => {
          clearInterval(interval);
        }, 180000);
      } else if (paymentStatus === 'approved') {
        handleDataPost();
        setPixId('');
        setPixHasCreated(false);
        setIsPay(true);
      }

      return () => clearInterval(interval);
    }
  }, [pixHasCreated, paymentStatus]);

  const getRandom = (a: number, b: number) => {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  };

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  };

  const handleDataPost = async () => {
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
        },
        { headers }
      )
      .then(async function (response) {
        handlePostLuckyNumbers(luckyNumberUser);
      })
      .catch(function (error) {
        console.error('err', error);
      });
  };

  const handlePostLuckyNumbers = async (array: number[]) => {
    return await api
      .post(
        `/tickets`,
        {
          luckyNumbers: array,
        },
        { headers }
      )
      .then(function (response) {
        console.log('resp', response);
      })
      .catch(function (error) {
        console.error('err', error);
      });
  };

  const handlePix = async () => {
    toast({
      title:
        'Após o pagamento AGUARDE e será redirecionado para seus números da sorte!',
      position: 'top-right',
      status: 'warning',
      variant: 'left-accent',
      duration: 9000,
      isClosable: true,
    });
    await pix
      .post(
        '/',
        {
          transaction_amount: value * qtd,
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
        sethasPix(true);
        setPixHasCreated(true);

        return response.data.send(200);
      })
      .catch(function (error) {
        console.error('err', error);
      });
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.100"
      backdropFilter="blur(5px) hue-rotate(10deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [checkboxState, setCheckboxState] = useState(true);

  const isErrorName = name === '';
  const isErrorEmail = email === '';
  const isErrorIndicacao = indicacao === '';
  const isErrorPhone = phone === '';
  const isErrorCpf = cpf === '';

  const [isError, setIsEror] = useState(false);

  return !isPay ? (
    <>
      <Flex minH={'79vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Flex align={'center'} justify="space-between">
              <Heading fontSize={'2xl'} color="orange.400">
                Pacote {value}
              </Heading>
              <Flex align={'center'}>
                <Text
                  color="orange.400"
                  fontSize="md"
                  fontWeight="bold"
                  mr="0.5rem"
                >
                  Qtd:
                </Text>
                <Button
                  colorScheme={'blackAlpha'}
                  onClick={() => setQtd(qtd - 1)}
                  disabled={qtd <= 1}
                >
                  -
                </Button>
                <Text
                  color="orange.400"
                  fontSize="md"
                  fontWeight="bold"
                  mx="0.4rem"
                >
                  {qtd}
                </Text>
                <Button
                  colorScheme={'blackAlpha'}
                  onClick={() => setQtd(qtd + 1)}
                  disabled={qtd === 5}
                >
                  +
                </Button>
              </Flex>
            </Flex>
            <FormControl id="name" isInvalid={isErrorName && isError}>
              <FormLabel>Nome completo:</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
              {isErrorName ? (
                <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl id="email" isInvalid={isErrorEmail && isError}>
              <FormLabel>Email:</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
              {isErrorEmail ? (
                <FormErrorMessage>Email é obrigatório.</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl id="indicacao" isInvalid={isErrorIndicacao && isError}>
              <FormLabel>Indicado por:</FormLabel>
              <Input
                type="text"
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
            <Flex py="2rem" direction={'column'} align="center">
              <Checkbox
                colorScheme="orange"
                onChange={() => setCheckboxState(false)}
              >
                <Text
                  fontSize="sm"
                  color={isError && checkboxState ? 'red.500' : 'gray.500'}
                >
                  Compreendo e aceito a política de armazenamento de dados.
                </Text>
              </Checkbox>
              <Button
                mt="0.5rem"
                textAlign={'right'}
                fontSize="sm"
                width={'15rem'}
                onClick={() => {
                  setOverlay(<OverlayOne />);
                  onOpen();
                }}
                colorScheme="gray"
              >
                <Text color="orange.400">Clique para saber mais.</Text>
              </Button>
            </Flex>
            <Stack spacing={6}>
              <Button
                colorScheme={'orange'}
                variant={'solid'}
                isLoading={isLoading ? true : false}
                loadingText="Aguardando pagamento"
                onClick={(e) => {
                  if (
                    name === '' ||
                    email === '' ||
                    indicacao === '' ||
                    phone === '' ||
                    cpf === '' ||
                    checkboxState
                  ) {
                    setIsEror(true);
                    return;
                  }
                  handlePix();
                  setIsLoading(true);
                }}
              >
                Gerar Pix
              </Button>
            </Stack>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              {overlay}
              <ModalContent>
                <ModalHeader>Política de armazenamento de dados</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text textAlign={'justify'}>
                    Para os organizadores desta promoção é de extrema
                    importância garantir a proteção das informações que nos são
                    confiadas pelos participantes e todos aqueles com quem nos
                    comunicamos. Estamos comprometidos em manter os mais altos
                    padrões de privacidade e proteção de dados, e atender aos
                    extensos requisitos legais e regulatórios no que diz
                    respeito ao manuseio das informações fornecidas. Nesse
                    sentido, estamos comprometidos em cumprir os requisitos da
                    Lei 13.709/2018, Lei Geral de Proteção de Dados (LGPD), e as
                    informações coletadas serão, assim, respeitadas e utilizadas
                    para o fim específico da promoção, sem compartilhamento de
                    dados ou divulgação para terceiros. Caso esteja de acordo em
                    prosseguir, marque a caixa acima.
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} colorScheme="orange">
                    Fechar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

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
              R$ {value * qtd}
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
              />
              <Flex>
                <Button
                  onClick={onCopy}
                  ml={2}
                  w={isWideVersion ? '' : '7rem'}
                  fontSize={isWideVersion ? '' : 'lg'}
                  colorScheme="blue"
                  mt={isWideVersion ? '0.5rem' : '1rem'}
                  mb={isWideVersion ? '' : '0.5rem'}
                >
                  {hasCopied ? 'Copiado' : 'Copiar'}
                </Button>
                <Button
                  onClick={() => navigate('/Pacotes')}
                  ml={2}
                  w={isWideVersion ? '' : '7rem'}
                  fontSize={isWideVersion ? '' : 'lg'}
                  colorScheme="orange"
                  mt={isWideVersion ? '0.5rem' : '1rem'}
                  mb={isWideVersion ? '' : '0.5rem'}
                >
                  Cancelar pix
                </Button>
              </Flex>
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
      tickets={ticket}
      email={email}
    />
  );
}
