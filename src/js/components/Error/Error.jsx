import React from 'react';

export const Error = ({ error }) => {

  return (
    <div className="info">
      <div className="info__location">{error.message}</div>
    </div>
  )
}
