import { Image, Box } from '@chakra-ui/react';
import manutencao from '../../assets/manutencao.png';

export function Manutencao() {
  return (
    <Box textAlign="center">
      <Image src={manutencao} w="100%" maxW="500px" m="auto" />
    </Box>
  );
}
