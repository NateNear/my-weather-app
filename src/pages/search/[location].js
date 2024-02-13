// pages/search/[location].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Text, Link, Flex } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { fetchWeatherData } from '../../utils/api';

const SearchLocation = () => {
  const router = useRouter();
  const { location } = router.query;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(location);
        setWeatherData(data);
      } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error('Error fetching weather data:', error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  return (
    <Layout>
      <Box p={8} maxW="xl" mx="auto" textAlign="center" boxShadow="md" borderRadius="md">
        {weatherData ? (
          <>
            <Heading mb={4} fontSize="4xl" fontWeight="bold" color="teal.500">
              {weatherData.name}
            </Heading>
            <Text fontSize="lg">Temperature: {weatherData.main.temp} °C</Text>
            <Text fontSize="lg">Humidity: {weatherData.main.humidity}%</Text>
            <Text fontSize="lg">Wind Speed: {weatherData.wind.speed} m/s</Text>
            <Text fontSize="lg">Description: {weatherData.weather[0].description}</Text>
          </>
        ) : (
          <Text fontSize="lg">Loading...</Text>
        )}
        <Flex justify="center" mt={8}>
          <Link
            href={`/details/${encodeURIComponent(location)}`}
            fontSize="lg"
            color="white"
            bg="teal.500"
            p={4}
            borderRadius="md"
            _hover={{ textDecoration: 'none', bg: 'teal.600' }}
          >
            View Details
          </Link>
        </Flex>
      </Box>
    </Layout>
  );
};

export default SearchLocation;
