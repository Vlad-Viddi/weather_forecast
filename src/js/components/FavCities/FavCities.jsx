import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { FavCity } from '../FavCity/FavCity';
import plus from '../../../imgs/svg/plus_icon.svg';

const FavCitiesPortal = ({ children }) => {
  const portal = document.createElement('div');

  useEffect(() => document.body.appendChild(portal));

  return ReactDom.createPortal(children, portal);
}

export const FavCities = ({ favCities, setIsFavOpen, setFavCity, handleDeleteFavCity }) => {

  const handleFavClose = () => setIsFavOpen(false);

  const handleCityChoose = (event) => {
    setIsFavOpen(false);
    setFavCity(event.target.innerText);
  }

  if(favCities.length === 0) {
    setIsFavOpen(false);
  }

  return (
    <FavCitiesPortal>
      <div className="favCitiesWrapper">
        <div className="favCities">
          <button
            onClick={handleFavClose}
            className="favCities__close"
          >
            <img
              className="favCities__closeImg"
              src={plus}
              alt="cross to close popup"
            />
          </button>
          <h1 className="favCities__header">Fav Cities</h1>
          <ul className="favCities__list">
            {favCities.map(item => (
              <FavCity
                city={item}
                handleCityChoose={handleCityChoose}
                handleDeleteFavCity={handleDeleteFavCity}
              />
            ))}
          </ul>
        </div>
      </div>
    </FavCitiesPortal>
  )
}
