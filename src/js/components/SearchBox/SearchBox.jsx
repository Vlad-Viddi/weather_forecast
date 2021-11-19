import React from 'react';

import { useFocus } from '../../customHooks';

export const SearchBox = ({ query, setQuery, fetchWeather }) => {
  const getWeather = e => {
    if(query.length > 1) {
      fetchWeather(e)
    }
  };



  const [inputRef, setInputFocus] = useFocus();

  return (
    <div className="search-box">
      <input
        autoFocus
        ref={inputRef}
        type="text"
        placeholder="Enter any city"
        className="search-bar"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={getWeather}
        onBlur={setInputFocus}
      />
    </div>
  )
}
