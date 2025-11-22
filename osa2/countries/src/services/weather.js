import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const getAll = async (city) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = baseUrl + city + "&appid=" + apiKey + "&units=metric";
  const response = await axios.get(url);
  return response.data;
};

const weather = {
  getAll,
};

export default weather;
