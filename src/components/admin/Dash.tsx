import { ReactNode, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { FiHome, FiMenu, FiChevronDown, FiPlusCircle } from 'react-icons/fi';
import { Tables } from './Tables';
import { NewUser } from './NewUser';
import { Home } from './Home';
import { Link as ReactRouter } from 'react-router-dom';

const Links = ['Dashboard', 'Tabelas', 'Inserir'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      color: '#3e6a6b',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export function Dash({ nameUser }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tab, setTab] = useState('Dashboard');

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Heading
              display="inline-block"
              as="h2"
              size="md"
              bgGradient="linear(to-r, #3e6a6b, #af9c36)"
              backgroundClip="text"
            >
              Viaje com rei
            </Heading>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <Box
                  onClick={() => {
                    link === 'Dashboard'
                      ? setTab('Dashboard')
                      : link === 'Tabelas'
                      ? setTab('Tabelas')
                      : setTab('Inserir');
                  }}
                >
                  <NavLink key={link}>{link}</NavLink>
                </Box>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <Avatar size={'sm'} src={'MG'} />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{nameUser.replace(/,/g, '')}</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <Link
                  as={ReactRouter}
                  to={'/'}
                  style={{ textDecoration: 'none' }}
                >
                  <MenuItem>Sair</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
          {/* <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'md'}
                  // src={
                  //   'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  // }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Sair</MenuItem>
              </MenuList>
            </Menu>
          </Flex> */}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                // <NavLink key={link}>{link}</NavLink>
                <Box
                  onClick={() => {
                    link === 'Dashboard'
                      ? setTab('Dashboard')
                      : link === 'Tabelas'
                      ? setTab('Tabelas')
                      : setTab('Inserir');
                  }}
                >
                  <NavLink key={link}>{link}</NavLink>
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
        {tab === 'Dashboard' ? (
          <Home nameUser="" />
        ) : tab === 'Tabelas' ? (
          <Tables />
        ) : (
          <NewUser />
        )}
      </Box>
    </>
  );
}
