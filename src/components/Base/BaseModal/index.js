import React from 'react';
import CloseButton from 'components/Base/CloseButton'

import './BaseModal.css';

function BaseModal(props) {
  if (!props.show) return null
    
  return (
    <div className="modal-dialog" role="dialog">
      <div className="modal" style={{width: props.width}}>
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
