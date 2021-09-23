import { Box } from '@chakra-ui/react';
import React from 'react';

export const H1 = ({ text }: { text: React.ReactNode }) => (
  <Box textAlign={'center'} margin={'50px 0'}>
    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{text}</h1>
  </Box>
);

export const H2 = ({ text }: { text: React.ReactNode }) => (
  <Box textAlign={'center'} margin={'50px 0'}>
    <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{text}</h2>
  </Box>
);

export const ACenter = ({ href, text }: { href: string, text: React.ReactNode }) => (
  <Box textAlign={'center'}>
    リンク: <a href={href} target={'_blank'}>{text}</a>
  </Box>
);