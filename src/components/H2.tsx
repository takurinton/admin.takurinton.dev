import { Box } from '@chakra-ui/react';
import React from 'react';

export const H2 = ({ text }: { text: React.ReactNode }) => (
  <Box textAlign={'center'} margin={'50px 0'}>
    <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{text}</h2>
  </Box>
);