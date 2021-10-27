import React from 'react';

const Error = ({ error }) => (
  <div className="info">
    <div className="info__location">{error.message}</div>
  </div>
)

export default React.memo(Error);
