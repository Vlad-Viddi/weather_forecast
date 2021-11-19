import React, { useState } from 'react';

import { SearchBox } from './components/SearchBox/SearchBox';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import Error from './components/Error/Error';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import { API } from './constants';
import { FavCities } from './components/FavCities/FavCities';

const App = () => {
  const [ query, setQuery ] = useState('');
  const [ isWeatherReceived, setIsWeatherReceived ] = useState(false);
  const [ weather, setWeather ] = useState({});
  const [ weatherBg, setWeatherBg ] = useState('');
  const [ error, setError ] = useState({});
  const [ isErrorReturned, setIsErrorReturned ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isFavOpen, setIsFavOpen ] = useState(false);
  const [ favCities, setFavCities ] = useState(['New York', 'Tokyo', 'London']);

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

  const dayNight = weatherBg.slice(-1) === 'n' ? 'night' : '';

  const toggleFavOpen = () => {
    setIsFavOpen(!isFavOpen);
  }

  return (
    <div
      className={`app app-${weatherBg}`}
    >
      <main className="content">
        <span
          className={`fav fav--${dayNight}`}
          onClick={toggleFavOpen}
        >
          FAV
        </span>
        <h1 className={`appTitle appTitle--${dayNight}`}>Weather Forecast App</h1>
        <SearchBox
          query={query}
          setQuery={setQuery}
          fetchWeather={fetchWeather}
        />
        {isWeatherReceived && (
          <WeatherInfo
            favCities={favCities}
            setFavCities={setFavCities}
            weather={weather}
          />
        )}
        {isErrorReturned && (
          <Error
            error={error}
          />
        )}
        {isLoading && <LoadingSpinner />}
        {isFavOpen && (
          <FavCities
            favCities={favCities}
            toggleFavOpen={toggleFavOpen}
            setFavCity={setQuery}
          />
        )}
      </main>
    </div>
  );
}

export default App;
