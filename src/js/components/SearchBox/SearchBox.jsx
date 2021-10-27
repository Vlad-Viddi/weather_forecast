import React from 'react';

export const SearchBox = ({ query, setQuery, getWeather }) => {

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter your city"
        className="search-bar"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => getWeather(e)}
      />
    </div>
  )
}
