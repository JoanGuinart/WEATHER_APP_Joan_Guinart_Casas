/* eslint-disable no-throw-literal */
import React, { useState } from "react";
import Form from "./Form";
import Card from "./Card";

const WeatherPanel = () => {
  let urlWeather =
    "https://api.openweathermap.org/data/2.5/weather?appid=97558b64a8f4fdfc9b7f4d46b8dd5ec0&lang=es";
  let cityUrl = "&q=";
  let urlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?appid=97558b64a8f4fdfc9b7f4d46b8dd5ec0&lang=es";

  const [weather, setweather] = useState([]);
  const [forecast, setforecast] = useState([]);
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const [location, setlocation] = useState("");

  const getLocation = async (loc) => {
    setloading(true);
    setlocation(loc);

    //Weather

    urlWeather = urlWeather + cityUrl + loc;

    await fetch(urlWeather)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((weatherData) => {
        console.log(weatherData);
        setweather(weatherData);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
        setshow(false);
      });

    //Forecast

    urlForecast = urlForecast + cityUrl + loc;

    await fetch(urlForecast)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((forecastData) => {
        console.log(forecastData);
        setforecast(forecastData);

        setloading(false);
        setshow(true);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
        setshow(false);
      });
  };

  return (
    <React.Fragment>
      <Form newLocation={getLocation} />

      <Card
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </React.Fragment>
  );
};

export default WeatherPanel;
