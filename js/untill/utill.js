import { API_KEY } from "./../config/constant.js";
const callApiSearch = (value) => {
  return axios({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`,
    method: "GET",
  });
};

const callApiDaily = (lat, lon) => {
  return axios({
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    method: "GET",
  });
};
export { callApiSearch, callApiDaily };
