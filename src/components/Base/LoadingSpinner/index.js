import React from 'react';
import PropTypes from 'prop-types';

import './LoadingSpinner.css';

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

      {
        props.text && 
        <div v-if="loadingText" className="loading-text">
          <span>
            { props.text }
          </span>
          { props.children }
        </div>
      }
    </div>
  )
}

LoadingSpinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  width: '1rem',
  height: '1rem'
};


export default LoadingSpinner;
