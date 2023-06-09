import { useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiHome, FiMenu, FiChevronDown, FiPlusCircle } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ImTable } from 'react-icons/im';
import { ReactText } from 'react';
import { Home } from './Home';
import { Tables } from './Tables';
import { Link as ReactRouter } from 'react-router-dom';
import { NewUser } from './NewUser';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Tabelas', icon: ImTable },
  { name: 'Inserir', icon: FiPlusCircle },
];

interface DashProps {
  nameUser: string;
}

export function Dashboard({ nameUser }: DashProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        onPageChange={handlePageChange}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} name={nameUser} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {pageNumber === 1 ? (
          <Home nameUser={nameUser} />
        ) : pageNumber === 2 ? (
          <NewUser />
        ) : (
          <Tables />
        )}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  onPageChange?: any;
}

const SidebarContent = ({ onClose, onPageChange, ...rest }: SidebarProps) => {
  const handlePageChangeToHome = () => {
    if (onPageChange) {
      const newPage = 0;
      console.log(`NavItem0`, newPage);
      onPageChange(newPage);
    }
  };
  const handlePageChangeToTables = () => {
    if (onPageChange) {
      const newPage = 1;
      console.log(`NavItem1`, newPage);
      onPageChange(newPage);
    }
  };
  const handlePageChangeToInserir = () => {
    if (onPageChange) {
      const newPage = 2;
      console.log(`NavItem2`, newPage);
      onPageChange(newPage);
    }
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize={'1.7rem'}
          as={'span'}
          position={'relative'}
          _after={{
            content: "''",
            width: 'full',
            height: useBreakpointValue({ base: '20%', md: '30%' }),
            position: 'absolute',
            bottom: 1,
            left: 0,
            bg: 'green.100',
            zIndex: -1,
          }}
          color="blue.600"
        >
          Viaje com Rei
        </Text>

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={
            link.name === 'Home'
              ? handlePageChangeToTables
              : link.name === 'Inserir'
              ? handlePageChangeToInserir
              : handlePageChangeToHome
          }
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  name: string;
}
const MobileNav = ({
  onOpen,
  name,
  scrollMarginRight,
  ...rest
}: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize={'1.5rem'}
        as={'span'}
        position={'relative'}
        _after={{
          content: "''",
          width: 'full',
          height: useBreakpointValue({ base: '20%', md: '30%' }),
          position: 'absolute',
          bottom: 1,
          left: 0,
          bg: 'green.100',
          zIndex: -1,
        }}
        color="blue.600"
      >
        Admin
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
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
                  <Text fontSize="sm">{name.replace(/,/g, '')}</Text>
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
      </HStack>
    </Flex>
  );
};
