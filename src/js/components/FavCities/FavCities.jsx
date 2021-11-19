import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import plus from '../../../imgs/svg/plus_icon.svg';

const FavCitiesPortal = ({ children }) => {
  const portal = document.createElement('div');

  useEffect(() => document.body.appendChild(portal));

  return ReactDom.createPortal(children, portal);
}

export const FavCities = ({ favCities, toggleFavOpen, setFavCity }) => {
  const handleCityChoose = (event) => {
    toggleFavOpen();
    setFavCity(event.target.innerText);
  }

  return (
    <FavCitiesPortal>
      <div className="favCitiesWrapper">
        <div className="favCities">
          <button
            onClick={toggleFavOpen}
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
              <li
                key={item}
                className="favCities__item"
                onClick={handleCityChoose}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FavCitiesPortal>
  )
}
