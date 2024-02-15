// components/Layout.js
import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { theme } from '../styles/theme';

const Layout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box bgColor={'#96C7ED'} minHeight="100vh">
        {children}
      </Box>
    </ChakraProvider>
  );
};

export default Layout;
