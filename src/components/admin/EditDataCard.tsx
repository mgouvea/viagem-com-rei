import {
  Heading,
  Box,
  Flex,
  Text,
  Stack,
  VStack,
  HStack,
  Divider,
  Badge,
  Input,
  Select,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../../services/api';
import { phoneMask } from '../../utils/mask';

export function EditDataCard(dataUser: any) {
  const toast = useToast();
  const {
    name,
    data,
    email,
    indicacao,
    luckyNumber,
    paymentId,
    paymentStatus,
    phone,
    _id,
  } = dataUser?.dataUser;

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  };

  const [nameState, setNameState] = useState('');
  const [dataState, setDataState] = useState('');
  const [emailState, setEmailState] = useState('');
  const [indicacaoState, setIndicacaoState] = useState('');
  const [paymentStatusState, setPaymentStatusState] = useState('');
  const [phoneState, setPhoneState] = useState('');

  const SaveItemEdited = async () => {
    const editItem = {
      name: !!nameState ? nameState : name,
      data: !!dataState ? dataState : data,
      email: !!emailState ? emailState : email,
      indicacao: !!indicacaoState ? indicacaoState : indicacao,
      paymentStatus: !!paymentStatusState ? paymentStatusState : paymentStatus,
      phone: !!phoneState ? phoneState : phone,
    };

    await api.patch(`/users/${_id}`, editItem, { headers }).then((response) => {
      toast({
        title: 'Sucesso',
        description: 'Item editado com sucesso',
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    });
  };

  return (
    <Stack border="1px solid #7c7e81" borderRadius="8px" py={2} px={2}>
      <Flex justify="center" mb={2}>
        <VStack>
          <Heading display="inline-block" as="h2" size="md" color="gray.600">
            {name}
          </Heading>
          {dataUser?.dataUser?.package == 20 ? (
            <Heading
              display="inline-block"
              as="h2"
              size="sm"
              bgGradient="linear(to-r, #FFCD97, #DA9D5C)"
              backgroundClip="text"
            >
              Bronze
            </Heading>
          ) : dataUser?.dataUser?.package == 30 ? (
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
        </VStack>
      </Flex>
      <Badge>Informações de contato</Badge>
      <Box bg="orange.50">
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Celular:</Text>
            <Input
              placeholder={phoneMask(phone)}
              onChange={(event) => {
                setPhoneState(event?.target?.value);
              }}
            />
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Email:</Text>
            <Input
              placeholder={email}
              onChange={(event) => {
                setEmailState(event?.target?.value);
              }}
            />
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
      </Box>
      <Badge>Informações de venda</Badge>
      <Box bg="orange.50">
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Data:</Text>
            <Input
              placeholder={data}
              onChange={(event) => {
                setDataState(event?.target?.value);
              }}
            />
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Indicação:</Text>
            <Input
              placeholder={indicacao}
              onChange={(event) => {
                setIndicacaoState(event?.target?.value);
              }}
            />
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Pagamento:</Text>
            <Select
              placeholder={
                paymentStatus === 'pending' ? 'Pendente' : 'Aprovado'
              }
              onChange={(event) => {
                console.log(event.target.value);
                setPaymentStatusState(event.target.value);
              }}
            >
              <option value="approved">Aprovado</option>
              <option value="pending">Pendente</option>
            </Select>
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
      </Box>
      <Badge>Numeração</Badge>
      <Box bg="orange.50">
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Números sorteados:</Text>
            {luckyNumber?.map((n: any, index: any) => (
              <Text key={index}>{n}</Text>
            ))}
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
      </Box>
      <Button colorScheme="green" mr={3} onClick={SaveItemEdited}>
        Salvar
      </Button>
    </Stack>
  );
}
