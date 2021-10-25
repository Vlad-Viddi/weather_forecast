import React from 'react';

export const Error = ({ error, query }) => {

  return (
    <div className="info">
      <div className="info__location">{query} - {error.message}</div>
    </div>
  )
}
