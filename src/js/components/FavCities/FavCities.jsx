import React from 'react';

export const FavCities = ({ favCities }) => {
  return (
    <div className="favCities">
      {favCities.map(item => <p key={item}>{item}</p>)}
    </div>
  )
}
