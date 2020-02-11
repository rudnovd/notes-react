import React from 'react';
import PropTypes from 'prop-types';

import './CloseButton.css'

CloseButton.propTypes = {
  hidden: PropTypes.bool
};

CloseButton.defaultProps = {
  hidden: false
};

function CloseButton(props) {
  if (props.hidden) {
    return (
      <button className="close-button hidden">
        <span className="cross-first-line" />
        <span className="cross-second-line" />
      </button>
    )
  } else {
    return (
      <button className="close-button" onClick={() => props.onClose()}>
        <span className="cross-first-line" />
        <span className="cross-second-line" />
      </button>
    )
  }
}

export default CloseButton;
