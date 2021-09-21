import * as utill from "./untill/utill.js";
// import "./animation/contractButton.js";

const getEle = (id) => document.getElementById(id);

const DEFAULT_VALUE = "--";
const cityName = getEle("city-name");
const weatherState = getEle("weather-state");
const weatherIcon = getEle("weather-icon");
const temperature = getEle("temperature");
const date = getEle("day");
const time = getEle("currentTime");

const sunRise = getEle("sunrise");
const sunSet = getEle("sunset");
const humidity = getEle("humidity");
const windSpeed = getEle("windSpeed");
const heightLevel = getEle("level");

const searchInput = getEle("search-input");

const fetchData = (result) => {
  cityName.innerHTML = result.data.name || DEFAULT_VALUE;
  weatherState.innerHTML = result.data.weather[0].description || DEFAULT_VALUE;

  weatherIcon.src = `https://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`;

  temperature.innerHTML = Math.round(+result.data.main.temp) || DEFAULT_VALUE;

  date.innerHTML = moment().format("dddd") + ":";

  time.innerHTML = moment().format("HH:mm");

  sunRise.innerHTML =
    moment.unix(result.data.sys.sunrise).format("LT") || DEFAULT_VALUE;

  sunSet.innerHTML =
    moment.unix(result.data.sys.sunset).format("LT") || DEFAULT_VALUE;

  humidity.innerHTML = result.data.main.humidity + " %" || DEFAULT_VALUE;

  heightLevel.style.height = `${result.data.main.humidity}%` || "0%";

  windSpeed.innerHTML = result.data.wind.speed + " km/h" || DEFAULT_VALUE;

  searchInput.value = "";
};

const dataDaily = (lat = 10.85, lon = 106.65) => {
  utill
    .callApiDaily(lat, lon)
    .then((result) => {
      let content = "";
      const daily = result.data.daily.slice(1, result.data.daily.length);
      daily.map((item) => {
        content += `            
          <div class="col">
          <div class="item">
            <p>${moment.unix(item.dt).format("dddd")}</p>
            <img src="https://openweathermap.org/img/wn/${
              item.weather[0].icon
            }@2x.png" alt="" />
            <p>${Math.round(item.temp.max)}</p>
          </div>
        </div>`;
      });
      getEle("daily").innerHTML = content;
    })
    .catch((err) => {
      console.log(err);
    });
};

const dataOpen = () => {
  utill
    .callApiSearch("ho chi minh")
    .then((result) => {
      fetchData(result);
      return dataDaily();
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
};

window.onload = dataOpen;

searchInput.addEventListener("change", (e) => {
  searchInput.blur();
  if (e.target.value.trim().length > 0) {
    utill
      .callApiSearch(e.target.value)
      .then((result) => {
        console.log(result.data);
        fetchData(result);
        return dataDaily(result.data.coord.lat, result.data.coord.lon);
      })
      .catch((err) => {
        console.log(err);
        alert("Không Thể Tìm Thấy Thành Phố Bạn Muốn !");
      });
  } else {
    alert("Press the city name!");
  }
});

getEle("check__point").addEventListener("click", function () {
  const check = getEle("check__point").checked;
  if (check) {
    getEle("detail").style.backgroundColor = "#000";
  } else {
    getEle("detail").style.backgroundColor = "#f8f8f8";
  }
});
