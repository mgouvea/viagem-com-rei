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
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import home from '../../assets/funHome3.jpg';
import phone from '../../assets/iph.png';
import { Routes, Route, useParams } from 'react-router-dom';
import { getParams } from '../../utils/getParams';
import { Navbar } from '../Navbar';
import { Details } from './Details';

interface ContentProps {
  name?: string;
  email?: string;
  phoneNumber?: string;
  number?: Array<number>;
  tickets?: number;
}

// const numberTeste = [2301,2302,2303,2304,2305]
// const phoneTeste = '(61) 98210-7187 '
// const nameTeste = 'Mateus Gouvêa '

export function PaymentApproved({
  name,
  phoneNumber,
  number,
  tickets,
  email,
}: ContentProps) {
  const { id } = useParams();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  var idTransaction = getParams('payment_id');

  useEffect(() => {
    console.log(idTransaction);
  }, []);

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    onAfterPrint: () => console.log('success'),
  });

  return (
    <Flex direction="column" bg="gray.100" h="100%">
      {/* <Navbar /> */}
      <Details name={name} numbers={number} />
    </Flex>
  );
}
