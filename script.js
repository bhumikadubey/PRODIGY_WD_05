// const url =
//   "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Germany";

const API_KEY = "1393dd5e71d26225de359a5cb9d28791";
const cityInput = document.getElementById("city");
const submitButton = document.getElementById("submit");
const locationButton = document.querySelector(".location-btn");
const weatherCardsDiv = document.querySelector(".weather-cards");

const createWeatherCard = (weatherItem) => {
    return `
        <li class="card">
            <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather-icon">
            <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
            <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
            <h4>Humidity: ${weatherItem.main.humidity}%</h4>
        </li>`;
};

const getWeatherDetails = (cityName) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
    
    fetch(WEATHER_API_URL)
        .then((res) => res.json())
        .then((data) => {
			// filter the forecasts to get only one forecast per day
			const uniqueForecastDays = [];
            const sixDaysForecast = data.list.filter(forecast => {
				const forecastDate = new Date(forecast.dt_txt).getDate();
				if(!uniqueForecastDays.includes(forecastDate)) {
					return uniqueForecastDays.push(forecastDate);
				}
			}); // Get the first 6 entries for a 6-day forecast
            weatherCardsDiv.innerHTML = "";
            
            sixDaysForecast.forEach((weatherItem, index) => {
                if (index !== -1) {
                    weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
                }
            });
        })
        .catch(() => {
            alert("An error occurred while fetching the weather forecast.");
        });
};

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    getWeatherDetails(cityInput.value);
});

const getUserDetails = () => {
	navigator.geolocation.getCurrentPosition(
		position => {
			const { latitude, longitude } = position.coords;
			const REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
			// Get city name from coordinates using reverse geocoding API
			fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
				const { name } = data[0];
				getWeatherDetails(name, latitude, longitude);
			}).catch(() => {
				alert("An error occurred while fetching the city!")
			});
		
		},
		error => {
			if(error.code === error.PERMISSION_DENIED) {
				alert("Geolocation request denied. Please reset location permission to grant access agian.");
			}
		}
	);
}


locationButton.addEventListener("click", (e) => {
    e.preventDefault();
    getUserDetails();
});

// Initial load with a default city
getWeatherDetails("Maharashtra");

