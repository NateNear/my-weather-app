// pages/search/[location].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
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
      <Box p={8} maxW="xl" mx="auto">
        {weatherData ? (
          <>
            <Heading mb={4}>{weatherData.name}</Heading>
            <Text>Temperature: {weatherData.main.temp} °C</Text>
            <Text>Humidity: {weatherData.main.humidity}%</Text>
            <Text>Wind Speed: {weatherData.wind.speed} m/s</Text>
            <Text>Description: {weatherData.weather[0].description}</Text>

          </>
        ) : (
          <Text>Loading...</Text>
        )}
        <Link href={`/details/${encodeURIComponent(location)}`}>
          View Details
        </Link>
      </Box>
    </Layout>
  );
};

export default SearchLocation;
