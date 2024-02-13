// pages/details/[location].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Text } from '@chakra-ui/react';
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
      <Box p={8} maxW="xl" mx="auto">
        <Heading mb={4}>Weather Details for {location}</Heading>
        {forecastData ? (
          <div>
            {forecastData.map((item) => (
              <Box key={item.dt} mb={4} borderBottom="1px solid #ccc">
                <Text>Date and Time: {item.dt_txt}</Text>
                <Text>Temperature: {item.main.temp} °C</Text>
                <Text>Humidity: {item.main.humidity}%</Text>
                <Text>Description: {item.weather[0].description}</Text>
              </Box>
            ))}
          </div>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </Layout>
  );
};

export default WeatherDetails;
