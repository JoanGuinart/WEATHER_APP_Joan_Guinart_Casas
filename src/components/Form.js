import React, { useState, useEffect } from 'react';

function Form({newLocation}) {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('');

  const API_KEY = "97558b64a8f4fdfc9b7f4d46b8dd5ec0";

  useEffect(() => {
    // Obtener ubicación actual del usuario
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => {
        console.log('Error al obtener la ubicación', error);
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;
    getWeatherData(location.latitude, location.longitude);
  }, [location]);

  const getWeatherData = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCity(data.name); // Actualizar la ciudad con la ubicación actual del usuario
        newLocation(data.name);
      })
      .catch(error => console.log('Error en la llamada a la API del clima', error));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (city === '') return;
    // Enviar la ubicación de la ciudad ingresada por el usuario a la API del clima
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Actualizar la interfaz con los datos del clima
      })
      .catch(error => console.log('Error en la llamada a la API del clima', error));
      newLocation(city)
  };

  if (!location) {
    return <div>Cargando ubicación...</div>;
  }

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <div className='input-group mb-3 mx-auto'>
          <input
            type='text'
            className='form-control'
            placeholder='Ciudad'
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button className='btn btn-primary input-group-text' type='submit'>
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
