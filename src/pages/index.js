import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from './firebase-auth/firebase';
import {
  Box,
  Flex,
  Input,
  IconButton,
  Heading,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout';

const Home = () => {
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (location.trim() !== '') {
      router.push(`/search/${encodeURIComponent(location)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <Flex
                direction="column"
        align="center"
        justify="center"
        height="100vh"
        bgGradient="linear(to-r, #cb2d3e, #ef473a)"
        css={{
          margin: 0,
          padding: 0,
          position: 'relative',
        }}
      >
        <Heading mb={8} color="white">
          Weather App
        </Heading>
        <Box
          position="relative"
          display="inline-block"
          bg="#2f3640"
          height="40px"
          borderRadius="40px"
          padding="10px"
          transition="0.4s"
          _hover={{
            '.searchInput': {
              width: '240px',
              padding: '0 6px',
            },
            '.searchButton': {
              background: 'white',
              color: '#2f3640',
            },
          }}
        >
          <Flex align="center">
            <InputGroup>
              <Input
                className="searchInput"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="E.g., New York"
                css={{
                  border: 'none',
                  background: 'none',
                  outline: 'none',
                  color: 'white',
                  fontSize: '16px',
                  lineHeight: '40px',
                  width: '0',
                  padding: '0',
                  transition: '0.4s',
                  '&:focus': {
                    width: '240px',
                    padding: '0 6px',
                  },
                }}
                onKeyDown={handleKeyDown}
              />
              <InputRightElement
                className="searchButton"
                width="40px"
                borderRadius="50%"
              >
                <IconButton
                  colorScheme="white"
                  borderRadius="50%"
                  background="#2f3640"
                  icon={<SearchIcon />}
                  onClick={handleSearch}
                />
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Box>

        <Box           position="fixed"
          top="0"
          right="0"
          p="4">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Profile"
              icon={<ChevronDownIcon />}
              variant="ghost"
              colorScheme="white" bgColor={'grey'}
            />
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Home;
