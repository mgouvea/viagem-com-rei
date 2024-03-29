import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Dash } from './Dash';

export function Admin() {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [pageAdmin, setPageAdmin] = useState(false);

  const [userEmail, setUserEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nameUser, setNameUser] = useState<string>('');

  const dbUsers = [
    {
      userEmail: 'mateuscg42@gmail.com',
      userPassword: 'Verde123',
      userName: 'Mateus Gouvêa',
    },
    {
      userEmail: 'joms_guedes@hotmail.com',
      userPassword: '123456',
      userName: 'João Gabriel',
    },
    {
      userEmail: 'jfelipe@gmail.com',
      userPassword: '22071961',
      userName: 'João Felipe',
    },
  ];

  const toast = useToast();

  const handleLogin = () => {
    if (dbUsers.map((user) => user.userEmail).includes(userEmail)) {
      // console.log('Email', true);
      if (dbUsers.map((user) => user.userPassword).includes(password)) {
        const name = dbUsers.map((user) => {
          if (user.userEmail === userEmail) {
            return `${user.userName}`;
          }
        });
        // console.log('password', name);
        setNameUser(name.toString());
        setSpinner(true);
        setTimeout(() => {
          setSpinner(false);
          toast({
            title: 'Logado com sucesso',
            status: 'success',
            duration: 1000,
            position: 'top-right',
            isClosable: true,
          });
          setPageAdmin(true);
        }, 750);

        console.log(`Bem vindo ${name}`);
      } else {
        console.log('password', false);
      }
    } else {
      toast({
        title: 'Email não encontrado',
        status: 'warning',
        duration: 1000,
        position: 'bottom',
        isClosable: true,
      });
    }
  };

  const isErrorEmail = userEmail === '';
  const isErrorPassword = password === '';

  const [isError, setIsEror] = useState(false);

  return !pageAdmin ? (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Faça Login
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            entre com seu usuário e senha ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={isErrorEmail && isError}>
              <FormLabel>Email:</FormLabel>
              <Input
                type="email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
              {isErrorEmail ? (
                <FormErrorMessage>Email é obrigatório.</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl id="password" isInvalid={isErrorPassword && isError}>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isErrorPassword ? (
                <FormErrorMessage>Senha obrigatória.</FormErrorMessage>
              ) : null}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={spinner ? true : false}
                loadingText="Carregando!"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => {
                  if (userEmail === '' || password === '') {
                    setIsEror(true);
                    return;
                  }
                  handleLogin();
                }}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Button size="md" colorScheme={'orange'} onClick={() => navigate('/')}>
          Volta para Home
        </Button>
        <Stack pt={6} color="gray.400">
          <Text align={'center'}>Dúvida?</Text>
          <Text align={'center'}>
            Entre em contato com o administrador do site!
          </Text>
        </Stack>
      </Stack>
    </Flex>
  ) : (
    <Dash nameUser={nameUser} />
    // <Dashboard nameUser={nameUser} />
  );
}
