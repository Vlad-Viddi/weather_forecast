/* 
 - 1 with query choose city like this:
  Search for cities starting with Lond: JSON: http://api.weatherapi.com/v1/search.json?key=<YOUR_API_KEY>&q=lond
 - 2 when we got city second request for weather like this:
   http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=<QUERY>


/*
  Search for cities starting with Lond: JSON: http://api.weatherapi.com/v1/search.json?key=<YOUR_API_KEY>&q=lond

  So to get current weather for London: JSON: http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London

  To get 7 day weather for US Zipcode 07112: JSON: http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7

*/

import React, { useState } from 'react';

import { SearchBox } from './components/SearchBox/SearchBox';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import { Error } from './components/Error/Error';

const api = {
  key: '429d2e287145e65ce74197b14fc241f4',
  baseUrl: 'https://api.openweathermap.org/data/2.5/',
};


const App = () => {
  const [ query, setQuery ] = useState('');
  const [ isWeatherReceived, setIsWeatherReceived ] = useState(false);
  const [ weather, setWeather ] = useState({});
  const [ error, setError ] = useState({});
  const [ isErrorReturned, setIsErrorReturned ] = useState(false);

  const getWeather = e => {
    if(e.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(info => {
          if(info.cod === "404") {
            setIsErrorReturned(true);
            setIsWeatherReceived(false);
            setError(info);
            setWeather({});
            throw new Error(info);
          } else if (info.cod === 200) {
            setWeather(info);
            setError({});
            setIsErrorReturned(false);
            setIsWeatherReceived(true);
          }
        })
        .catch(error => {
          // setError(error);
          console.log(error);
        })
    }
  }

  return (
    <div
      className="app"
    >
      <main className="content">
        <SearchBox
          query={query}
          setQuery={setQuery}
          getWeather={getWeather}
        />
        {isWeatherReceived && (
          <WeatherInfo weather={weather} />
        )}
        {isErrorReturned && (
          <Error
            query={query}
            error={error}
          />
        )}
      </main>
    </div>
  );
}

export default App;
