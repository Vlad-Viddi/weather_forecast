import React from 'react';

export const SearchBox = ({ query, setQuery, fetchWeather }) => {
  const getWeather = e => {
    if(query.length > 1) {
      fetchWeather(e)
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter any city"
        className="search-bar"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={getWeather}
      />
    </div>
  )
}
