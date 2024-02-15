// pages/details/[location].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Text, VStack, Link, Grid, GridItem } from '@chakra-ui/react';
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
          <Grid
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap={6}
            justifyContent="center"
          >
            {forecastData.map((item) => (
              <GridItem
                key={item.dt}
                p={4}
                border="1px solid #ccc"
                borderRadius="xl"
                boxShadow="xl"
                textAlign="left"
                bgColor={'#87B7DD'}
              >
                <Text fontWeight={'700'}>Date and Time: {item.dt_txt}</Text>
                <Text fontWeight={'700'}>Temperature: {item.main.temp} °C</Text>
                <Text fontWeight={'700'}>Humidity: {item.main.humidity}%</Text>
                <Text fontWeight={'700'}>Description: {item.weather[0].description}</Text>
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Text>Loading...</Text>
        )}
        <Link href={`/search/${encodeURIComponent(location)}`} mt={4} fontSize={'x-large'} fontWeight={'800'} color="black.500">
          Back to Search
        </Link>
      </Box>
    </Layout>
  );
};

export default WeatherDetails;
