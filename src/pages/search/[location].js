// pages/search/[location].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Text, Link, Flex, Switch } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { fetchWeatherData } from '../../utils/api';

const SearchLocation = () => {
  const router = useRouter();
  const { location } = router.query;
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(location);
        setWeatherData(data);
        // Set background image based on temperature
        if (data.main.temp < 20) {
          setBackgroundImage('/cold.jpg');
        } else {
          setBackgroundImage('/warm.jpg');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <Layout>
      <Flex
        justify="center"
        align="center"
        minHeight="100vh"
      >
        <Box
          height="70vh"
          width="100%"
          p={8}
          maxW="xl"
          textAlign="center"
          boxShadow="md"
          borderRadius="md"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
        >
          <Flex justify="flex-end" mb={4}>
            <Switch
              colorScheme="teal"
              size="md"
              isChecked={isCelsius}
              onChange={toggleTemperatureUnit}
            />
          </Flex>
          {weatherData ? (
            <>
              <Heading mb={4} fontSize="4xl" fontWeight="bold" color="grey.500">
                {weatherData.name}
              </Heading>
              <Text fontSize="lg" fontWeight="500">
                Temperature: {isCelsius ? weatherData.main.temp : celsiusToFahrenheit(weatherData.main.temp)} {isCelsius ? '°C' : '°F'}
              </Text>
              <Text fontSize="lg" fontWeight="500">Humidity: {weatherData.main.humidity}%</Text>
              <Text fontSize="lg" fontWeight="500">Wind Speed: {weatherData.wind.speed} m/s</Text>
              <Text fontSize="lg" fontWeight="500">Description: {weatherData.weather[0].description}</Text>
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
      </Flex>
    </Layout>
  );
};

export default SearchLocation;

// Function to convert Celsius to Fahrenheit
const celsiusToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit.toFixed(1);
};
