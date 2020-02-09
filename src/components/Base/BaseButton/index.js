import React from 'react';
import LoadingSpinner from 'components/Base/LoadingSpinner'

import './BaseButton.css';

function BaseButton(props) {
  return (
    <button
      type="button"
      className={`base-button ${props.className}`}
      title={props.title}
      disabled={props.loading}
      onClick={() => props.onClick()}
    >
      { props.loading && 
        <LoadingSpinner show={props.loading} color={props.loadingSpinnerColor} size="1rem" />
      }

      { !props.loading && props.children }
    </button>
  );
}

export default BaseButton;
