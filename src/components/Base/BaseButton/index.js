import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/Base/LoadingSpinner'

import './BaseButton.css';

BaseButton.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
};

BaseButton.defaultProps = {
  loading: false,
  title: ''
};

function BaseButton(props) {
  return (
    <button
      type="button"
      className={`${props.className ? `base-button ${props.className}` : "base-button"}`}
      title={props.title}
      disabled={props.loading}
      onClick={() => props.onClick()}
    >
      { props.loading && 
        <LoadingSpinner show={props.loading} size="1rem" />
      }

      { !props.loading && props.children }
    </button>
  );
}

export default BaseButton;
