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
import Error from './components/Error/Error';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import { API } from './constants';

const App = () => {
  const [ query, setQuery ] = useState('');
  const [ isWeatherReceived, setIsWeatherReceived ] = useState(false);
  const [ weather, setWeather ] = useState({});
  const [ weatherBg, setWeatherBg ] = useState('');
  const [ error, setError ] = useState({});
  const [ isErrorReturned, setIsErrorReturned ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const handleFetch = data => {
    if(data.cod === "404") {
      setIsLoading(false);
      setIsErrorReturned(true);
      setIsWeatherReceived(false);
      setError(data);
      setWeather({});
    } else if (data.cod === 200) {
      setIsLoading(false);
      setWeather(data);
      setWeatherBg(data.weather[0].icon);
      setError({});
      setIsErrorReturned(false);
      setIsWeatherReceived(true);
    }
  }

  const fetchWeather = e => {
    if(e.key === "Enter") {
      setIsLoading(true);
      setIsErrorReturned(false);
      setIsWeatherReceived(false);
      fetch(`${API.baseUrl}weather?q=${query}&units=metric&APPID=${API.key}`)
        .then(response => response.json())
        .then(handleFetch)
    }
  }

  console.log(weather.weather && weather.weather[0].icon);
  console.log(weatherBg);

  return (
    <div
      className={`app app-${weatherBg}`}
    >
      <main className="content">
        <h1 className="appTitle">Weather Forecast App</h1>
        <SearchBox
          query={query}
          setQuery={setQuery}
          fetchWeather={fetchWeather}
        />
        {isWeatherReceived && (
          <WeatherInfo
            weather={weather}
          />
        )}
        {isErrorReturned && (
          <Error
            error={error}
          />
        )}
        {isLoading && (<LoadingSpinner />)}
      </main>
    </div>
  );
}

export default App;
