import { Flex } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { getParams } from '../../utils/getParams';
import { Details } from './Details';

interface ContentProps {
  name?: string;
  email?: string;
  phoneNumber?: string;
  number?: Array<number>;
  tickets?: number;
}

export function PaymentApproved({
  name,
  phoneNumber,
  number,
  tickets,
  email,
}: ContentProps) {
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
      <Details name={name} numbers={number} />
    </Flex>
  );
}
