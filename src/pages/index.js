// pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react';
import Layout from '../components/Layout';

const Home = () => {
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (location.trim() !== '') {
      router.push(`/search/${encodeURIComponent(location)}`);
    }
  };

  return (
    <Layout>
      <Box p={8} maxW="xl" mx="auto" textAlign="center">
        <Heading mb={8}>Weather App</Heading>
        <FormControl id="location" mb={4}>
          <FormLabel>Enter city or location</FormLabel>
          <Input
            variant='filled'
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="E.g., New York"
          />
        </FormControl>
        <Button colorScheme="teal" size="lg" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Layout>
    
  );
};

export default Home;
