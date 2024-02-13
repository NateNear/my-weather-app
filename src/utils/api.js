// utils/api.js
import axios from 'axios';

const API_KEY = 'e74107f1f4d659b0d64ae2727b7f73ce';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Function to fetch current weather data for a specific location
export const fetchWeatherData = async (location) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Function to fetch 5-day weather forecast for a specific location
export const fetchFiveDayForecast = async (location) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`
    );
    return response.data.list; // Extracting the list property from the response
  } catch (error) {
    console.error('Error fetching 5-day forecast:', error);
    throw error;
  }
};
