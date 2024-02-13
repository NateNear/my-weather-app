// components/Layout.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

const Layout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <div>{children}</div>
    </ChakraProvider>
  );
};

export default Layout;
