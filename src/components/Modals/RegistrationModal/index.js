import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseButton from 'components/Base/BaseButton';
import BaseModal from 'components/Base/BaseModal';

import { registration } from 'services/api/account';

import './RegistrationModal.css';

RegistrationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onRegistration: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

RegistrationModal.defaultProps = {
  show: false,
  onRegistration: () => {},
  onClose: () => {}
};

function RegistrationModal(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatedPassword, setRepeatedPassword] = useState("")
  const [registartionCompleted, setRegistrationCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  function onRegistration() {
    if (!email.length || !password.length) return
    else if (password !== repeatedPassword) return

    setLoading(true)
    registration(email, password)
      .then(response => {
        setRegistrationCompleted(true)
        props.onRegistration(response)
      })
      .catch(error => {
        console.error(error)
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError("Email address already registered")
            break
          case 'auth/invalid-email':
            setError("Invalid email address")
            break
          case 'auth/weak-password':
            setError("The password is too weak")
            break
          default:
            setError(error.message)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  let registrationModal

  if (!registartionCompleted) {
    registrationModal = 
      <form className="registration-form">
        <label htmlFor="input-email" className="label-email">Email:</label>
        <input id="input-email" className="input-email" type="email" value={email} onChange={event => setEmail(event.target.value)} />
        
        <label htmlFor="input-password" className="label-password">Password:</label>
        <input id="input-password" className="input-password" type="password" value={password} onChange={event => setPassword(event.target.value)} />

        <label htmlFor="repeat-password" className="label-password">Repeat password:</label>
        <input id="repeat-password" className="input-password" type="password" value={repeatedPassword} onChange={event => setRepeatedPassword(event.target.value)} />
        
        <BaseButton className="button-registration" onClick={onRegistration} loading={loading}>
          Registration
        </BaseButton>

        {error &&
          <div className="form-error">
            {error}
          </div>
        }
      </form>
  } else {
    registrationModal = 
    <div className="successful-registration">
      <span>Account successfully registered.</span>
      <BaseButton className="return-login-button" onClick={() => props.onClose()}>Login</BaseButton>
    </div>
  }

  return (
    <BaseModal show={props.show} closeButtonHidden={registartionCompleted} size="small" onClose={() => props.onClose()}>
      <div className="registration-modal">
        { registrationModal }
      </div>
    </BaseModal>
  );
}

export default RegistrationModal;
