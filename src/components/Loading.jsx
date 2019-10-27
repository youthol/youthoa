import React from 'react';


function Loading(props) {
  return (
    <div className={`orbit-spinner ${props.className}`}>
      <div className="orbit"></div>
      <div className="orbit"></div>
      <div className="orbit"></div>
    </div>
  );
}

export default Loading