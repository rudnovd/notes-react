import React from 'react';

import './CloseButton.css'

function CloseButton(props) {
  if (props.hidden) return null

  return (
    <button className="close-button" onClick={() => props.onClose()}>
      <span className="cross-first-line" />
      <span className="cross-second-line" />
    </button>
  )
}

export default CloseButton;
