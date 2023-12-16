const url =
  "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Germany";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "35795131dfmshb595cd32ba76923p1e215fjsn689296e78513",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

const getWeather = (city) => {
	fetch(url, options)
	.then((Response) => Response.json())
	.then((Response) => {
	  console.log(Response);
	  temp = Response.temp;
	  feels_like = Response.feels_like;
	  humidity = Response.humidity;
	  min_temp = Response.min_temp;
	  max_temp = Response.max_temp;
	  wind_speed = Response.wind_speed;
	  wind_degrees = Response.wind_degree;
	  sunrise = Response.sunrise;
	  sunset = Response.sunset;
	})
	.catch((err) => console.error(err));
}

submit.addEventListener("click", (e)=>{
	getWeather(city.value)
})

getWeather("Maharashtra")
