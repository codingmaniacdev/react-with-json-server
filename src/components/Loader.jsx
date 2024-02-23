import React from 'react';

const Loader = () => (
  <div className="d-flex justify-content-center align-items-center loader-container">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;
