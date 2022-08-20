import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';

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
  ];

  const toast = useToast();

  const handleLogin = () => {
    if (dbUsers.map((user) => user.userEmail).includes(userEmail)) {
      console.log('Email', true);
      if (dbUsers.map((user) => user.userPassword).includes(password)) {
        console.log('password', true);
        const name = dbUsers.map((user) => `${user.userName}`);
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
      console.log('Email', false);
    }
  };

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
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
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
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={spinner ? true : false}
                loadingText="Deus tá vendo!"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleLogin}
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
    <Dashboard nameUser={nameUser} />
  );
}
