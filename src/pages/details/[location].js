// pages/details/[location].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Text, VStack, Link } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { fetchFiveDayForecast } from '../../utils/api';

const WeatherDetails = () => {
  const router = useRouter();
  const { location } = router.query;
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const data = await fetchFiveDayForecast(location);
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching 5-day forecast data:', error);
        // Handle error, e.g., show an error message to the user
      }
    };

    if (location) {
      fetchForecastData();
    }
  }, [location]);

  return (
    <Layout>
      <Box p={8} maxW="xl" mx="auto" textAlign="center">
        <Heading mb={4}>Weather Details for {location}</Heading>
        {forecastData ? (
          <VStack spacing={4}>
            {forecastData.map((item) => (
              <Box
                key={item.dt}
                p={4}
                border="1px solid #ccc"
                borderRadius="md"
                boxShadow="md"
                textAlign="left"
              >
                <Text>Date and Time: {item.dt_txt}</Text>
                <Text>Temperature: {item.main.temp} °C</Text>
                <Text>Humidity: {item.main.humidity}%</Text>
                <Text>Description: {item.weather[0].description}</Text>
              </Box>
            ))}
          </VStack>
        ) : (
          <Text>Loading...</Text>
        )}
        <Link href={`/search/${encodeURIComponent(location)}`} mt={4} color="teal.500">
          Back to Search
        </Link>
      </Box>
    </Layout>
  );
};

export default WeatherDetails;