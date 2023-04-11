import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import "../assets/css/ColorByHour.css"

const Card = ({ showData, loadingData, weather, forecast }) => {

  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("")

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 6 && hour < 11) {
      setBgColor("morning");
      setTextColor("textDark")
    } else if (hour >= 12 && hour < 18) {
      setBgColor("midday");
      setTextColor("textDark")
    } else if (hour >= 18 && hour < 22) {
      setBgColor("afternoon");
      setTextColor("textDark")
    } else {
      setBgColor("night");
      setTextColor("textLight")
    }
  }, []);

  console.log(bgColor)
  



  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = day + "/" + month + "/" + year;
  let fecha = new Date();
  let hora = fecha.getHours();
  let minutes = fecha.getMinutes();
  let minutesLesTen = fecha.getMinutes()<10?'0':''

  let url = "";
  let iconUrl = "";

  let iconUrl3 = "";
  let iconUrl6 = "";
  let iconUrl9 = "";

  let forecastDate3 = "";
  let forecastDate6 = "";
  let forecastDate9 = "";

  if (loadingData) {
    return <Spinner />;
  }

  if (showData) {
    url = "http://openweathermap.org/img/w/";
    iconUrl = url + weather.weather[0].icon + ".png";

    iconUrl3 = url + forecast.list[1].weather[0].icon + ".png";
    iconUrl6 = url + forecast.list[2].weather[0].icon + ".png";
    iconUrl9 = url + forecast.list[3].weather[0].icon + ".png";

    forecastDate3 =
      forecast.list[1].dt_txt.substring(8, 10) +
      "/" +
      forecast.list[1].dt_txt.substring(5, 7) +
      "/" +
      forecast.list[1].dt_txt.substring(0, 4) +
      " " +
      forecast.list[1].dt_txt.substring(11, 13);

    forecastDate6 =
      forecast.list[2].dt_txt.substring(8, 10) +
      "/" +
      forecast.list[1].dt_txt.substring(5, 7) +
      "/" +
      forecast.list[2].dt_txt.substring(0, 4) +
      " " +
      forecast.list[2].dt_txt.substring(11, 13);

    forecastDate9 =
      forecast.list[3].dt_txt.substring(8, 10) +
      "/" +
      forecast.list[1].dt_txt.substring(5, 7) +
      "/" +
      forecast.list[3].dt_txt.substring(0, 4) +
      " " +
      forecast.list[3].dt_txt.substring(11, 13);
  }

  return (
    <div>
      {showData === true ? (
        <div className="container-fluid">
          <div className={`card p-3 mx-auto ${bgColor} ${textColor}`}>
            <div className="row g-0">
              <div className="col-xs-12 col-sm-6">
                <h3 className={`card-title mt-2`}>{weather.name}</h3>
                <p className={`card-date`}>{date}</p>
                
                <p className={`card-date`}>{hora + ":" + minutesLesTen + minutes + "h"}</p>
                <h1 className={`card-temp`}>
                  {(weather.main.temp - 273.15).toFixed(1)}ºC
                </h1>
                <p className={`card-desc`}>
                  <img src={iconUrl} alt="icon" />
                  {weather.weather[0].description}
                </p>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="card-body text-start mt-2">
                  <h5 className={`card-test`}>
                    Temperatura máxima:{" "}
                    {(weather.main.temp_max - 273.15).toFixed(1)}ºC
                  </h5>
                  <h5 className="card-test">
                    Temperatura mínima:{" "}
                    {(weather.main.temp_min - 273.15).toFixed(1)}ºC
                  </h5>
                  <h5 className="card-test">
                    Sensacíon térmica:{" "}
                    {(weather.main.feels_like - 273.15).toFixed(1)}ºC
                  </h5>
                  <h5 className="card-test">
                    Humedad: {weather.main.humidity}%
                  </h5>
                  <h5 className="card-test">
                    Velocidad del Viento: {weather.wind.speed}m/s
                  </h5>
                </div>
                <hr />

                <div className="row mt-4">
                  <div className="col">
                    <p>{forecastDate3}h</p>
                    <p className="description">
                      {" "}
                      <img src={iconUrl3} alt="icon" />
                      <br />
                      {forecast.list[1].weather[0].description}
                    </p>
                    <p className="temp">
                      {(forecast.list[1].main.temp - 273.15).toFixed(1)}ºC
                    </p>
                  </div>
                  <div className="col">
                    <p>{forecastDate6}h</p>
                    <p className="description">
                      {" "}
                      <img src={iconUrl6} alt="icon" />
                      <br />
                      {forecast.list[2].weather[0].description}
                    </p>
                    <p className="temp">
                      {(forecast.list[2].main.temp - 273.15).toFixed(1)}ºC
                    </p>
                  </div>
                  <div className="col">
                    <p>{forecastDate9}h</p>
                    <p className="description">
                      {" "}
                      <img src={iconUrl9} alt="icon" />
                      <br />
                      {forecast.list[3].weather[0].description}
                    </p>
                    <p className="temp">
                      {(forecast.list[3].main.temp - 273.15).toFixed(1)}ºC
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className={`${textColor}`}>No hay datos o Localización incorrecta</h2>
      )}
    </div>
  );
};

export default Card;
