import React, { useState } from 'react';

import Tooltip from '../Tooltip/Tooltip';
import { getCurrentDate, alreadyHasCity } from '../../helpers';
import doneSVG from '../../../imgs/svg/done_icon.svg';
import plusSVG from '../../../imgs/svg/plus_icon.svg';

const WeatherInfo = ({ weather, setFavCities, favCities }) => {
  const [ isTipShown, setIsTipShown ] = useState(false);

  const temperature = Math.floor(weather.main.temp);
  const weatherType = `${weather.weather[0].main} / ${weather.weather[0].description}`;
  const currentCity = weather.name;
  const currentState = weather.sys.country;
  const feelsLike = Math.floor(weather.main.feels_like);
  const tempMin = Math.floor(weather.main.temp_min);
  const tempMax = Math.floor(weather.main.temp_max);
  const humidity = weather.main.humidity;
  const pressure = weather.main.pressure;
  const sunrise = (new Date((weather.sys.sunrise + weather.timezone - 10800) * 1000).toLocaleTimeString().slice(0, 5));
  const sunset = (new Date((weather.sys.sunset + weather.timezone - 10800) * 1000).toLocaleTimeString().slice(0, 5));
  const currentTime = (new Date((weather.dt + weather.timezone - 10800) * 1000).toLocaleTimeString().slice(0, 5));
  const tempUnit = {
    celsius: "°C",
    farhenheit: "°F"
  }

  const addFavCity = () => {
    if (!alreadyHasCity(favCities, currentCity)) {
      setFavCities([...favCities, currentCity]);
    }
  }

  return (
    <div className="info">
      <div className="info__location">
        {currentCity}, {currentState}
        <button
          type="button"
          className="addFavBtn"
          onClick={addFavCity}
          onMouseEnter={() => setIsTipShown(true)}
          onMouseLeave={() => setIsTipShown(false)}
        >
          {
            alreadyHasCity(favCities, currentCity)
            ? <img src={doneSVG} alt="done icon" />
            : <img src={plusSVG} alt="plus (add) icon" />
          }
        </button>
        {isTipShown && <Tooltip>{alreadyHasCity(favCities, currentCity) ? 'Added' : 'Add to Fav'}</Tooltip>}
      </div>
      <div className="info__date">{getCurrentDate()} - {currentTime}</div>

      <div className="info__temp">
        {temperature}&deg;C
      </div>
      <div className="info__weather">
        {weatherType}
      </div>
      <hr />
      <div className="extra-container">
        <div className="extra extra--fst">
          <div className="extra__name">Feels like</div>
          <div className="extra__value">{feelsLike}{tempUnit.celsius}</div>
        </div>
        <div className="extra">
          <div className="extra__name">Min temperature</div>
          <div className="extra__value">{tempMin}{tempUnit.celsius}</div>
        </div>
        <div className="extra">
          <div className="extra__name">Max temperature</div>
          <div className="extra__value">{tempMax}{tempUnit.celsius}</div>
        </div>
        <div className="extra">
          <div className="extra__name">Sunrise</div>
          <div className="extra__value">{sunrise}</div>
        </div>
        <div className="extra">
          <div className="extra__name">Sunset</div>
          <div className="extra__value">{sunset}</div>
        </div>
        <div className="extra">
          <div className="extra__name">Humidity</div>
          <div className="extra__value">{humidity}%</div>
        </div>
        <div className="extra extra--last">
          <div className="extra__name">Pressure</div>
          <div className="extra__value">{pressure}hPa</div>
        </div>
      </div>
    </div>
  )
}

export default WeatherInfo;
