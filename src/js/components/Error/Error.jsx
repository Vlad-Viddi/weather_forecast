import React from 'react';

const Error = ({ error }) => {
  console.log('error from component ', error);

  return (
    <div className="info">
      <div className="info__location">{error.message}</div>
    </div>
  )
}

export default Error;
