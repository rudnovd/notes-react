import React from 'react';
import CloseButton from 'components/Base/CloseButton'
import PropTypes from 'prop-types';

import './BaseModal.css';

BaseModal.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.string,
};

BaseModal.defaultProps = {
  show: false,
  size: 'medium'
};

function BaseModal(props) {
  if (!props.show) return null
    
  return (
    <div className="modal-dialog" role="dialog">
      <div className={`modal modal-${props.size}`}>
        <div className="modal-content">
          <div className="header">
            <CloseButton hidden={ props.closeButtonHidden } onClose={() => props.onClose()} />
          </div>

          <div className="content">
            { props.children }
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaseModal;
