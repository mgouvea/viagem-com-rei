import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
  Badge,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  SimpleGrid,
} from '@chakra-ui/react';
import { phoneMask } from '../../utils/mask';
import { UsersProps } from './Tables';

export function ViewCard(dataUser: any) {
  const {
    name,
    data,
    email,
    indicacao,
    luckyNumber,
    paymentId,
    paymentStatus,
    phone,
  } = dataUser?.dataUser;
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
            <Text>{phoneMask(phone)}</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Email:</Text>
            <Text>{email}</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
      </Box>
      <Badge>Informações de venda</Badge>
      <Box bg="orange.50">
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Data:</Text>
            <Text>{data}</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Indicação:</Text>
            <Text>{indicacao}</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Pagamento:</Text>
            <Text>{paymentStatus}</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
      </Box>
      <Badge>Numeração</Badge>
      <Box bg="orange.50">
        <Box px={4}>
          <HStack justify={'flex-start'} py={2}>
            <Text>Números sorteados:</Text>
            <Box pl="1rem">
              {luckyNumber?.map((n: any, index: any) => (
                <Text key={index}>{n}</Text>
              ))}
            </Box>
          </HStack>
          <Divider orientation="horizontal" />
        </Box>
      </Box>
    </Stack>
  );
}
