import React, { useState } from 'react';
import cn from 'classnames';

import trash from '../../../imgs/svg/trash_icon.svg';

export const FavCity = ({ city, handleCityChoose, handleDeleteFavCity }) => {
  const [ isTrashbinVisible, setIsTrashbinVisible ] = useState(false);
  return (
    <li
      key={city}
      className="favCities__item"
      onClick={handleCityChoose}
      value={city}
      onMouseEnter={() => setIsTrashbinVisible(true)}
      onMouseLeave={() => setIsTrashbinVisible(false)}
    >
      {city}
      <span
        className={cn("trashbin", {"trashbin--visible": isTrashbinVisible})}
        onClick={handleDeleteFavCity}
      >
        <img
          className="trashbin__img"
          src={trash}
          alt="delete city icon"
          data-value={city}
        />
      </span>
    </li>
  )
}