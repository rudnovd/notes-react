import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseButton from 'components/Base/BaseButton';
import BaseModal from 'components/Base/BaseModal';

import { resetPassword } from 'services/api/account';

import './ResetPasswordModal.css';

ResetPasswordModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onResetPassword: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

ResetPasswordModal.defaultProps = {
  show: false,
  onResetPassword: () => {},
  onClose: () => {}
};

function ResetPasswordModal(props) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  function onResetPassword() {
    if (!email.length) return

    setLoading(true)
    resetPassword(email)
      .then(response => {
        props.onResetPassword(response)
      })
      .catch(error => {
        console.error(error)
        switch (error.code) {
          case 'auth/invalid-email':
            setError("Invalid email address")
            break
          case 'auth/user-not-found':
            setError("User with that email not found")
            break
          default:
            setError(error.message)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <BaseModal show={props.show} size="small" onClose={() => props.onClose()}>
      <div className="reset-password-modal">
        <form className="reset-password-form">
          <label htmlFor="input-email" className="label-email">Email:</label>
          <input id="input-email" className="input-email" type="email" value={email} onChange={event => setEmail(event.target.value)} />

          <BaseButton className="button-reset" onClick={onResetPassword} loading={loading}>
            Reset password
          </BaseButton>

          {error &&
            <div className="form-error">
              {error}
            </div>
          }
        </form>
      </div>
    </BaseModal>
  );
}

export default ResetPasswordModal;
