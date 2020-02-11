import React from 'react';
import PropTypes from 'prop-types';

import './LoadingSpinner.css';

LoadingSpinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  width: '1rem',
  height: '1rem'
};

function LoadingSpinner(props) {
  if (!props.show) return null
  
  return (
    <div className="loading-spinner">
      <div
        className="spinner"
        style={{
          width: props.size,
          height: props.size,
          borderColor: props.color,
          borderTopColor: `rgba(${props.color}, 0.3)`
        }}
      />

      {props.text && 
        <div className="loading-text">
          <span>
            { props.text }
          </span>
          { props.children }
        </div>
      }
    </div>
  )
}

export default LoadingSpinner;
