import React, { useState } from 'react';
import BaseButton from 'components/Base/BaseButton';
import BaseModal from 'components/Base/BaseModal';

import { login } from 'services/api/account';

import './LoginModal.css';

function LoginModal(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  function onLogin() {
    if (!email.length || !password.length) return

    setLoading(true)
    login(email, password)
      .then(response => {
        props.onLogin(response)
      })
      .catch(error => {
        console.error(error)
        switch (error.code) {
          case 'auth/invalid-email':
            setError("Not valid email address")
            break
          case 'auth/user-disabled':
            setError("User is disabled")
            break
          case 'auth/user-not-found':
            setError("User not found")
            break
          case 'auth/wrong-password':
            setError("Wrong password")
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
    <BaseModal show={props.show} width="600px" onClose={() => props.onClose()} closeButtonHidden={true}>
      <div className="login-modal">
        <form className="login-form">
          <label htmlFor="input-email" className="label-email">Email:</label>
          <input id="input-email" className="input-email" type="email" value={email} onChange={event => setEmail(event.target.value)} />
          
          <label htmlFor="input-password" className="label-password">Password:</label>
          <input id="input-password" className="input-password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
          
          <BaseButton className="button-login" onClick={onLogin} loading={loading}>
            Login
          </BaseButton>

          {error &&
            <div className="form-error">
              {error}
            </div>
          }
        </form>

        <div className="registration">
          <BaseButton className="button-link" onClick={() => props.showRegistrationModal()}>
            Registration
          </BaseButton>
        </div>

        <div className="forgot-password">
          <BaseButton className="button-link" onClick={() => props.showResetPasswordModal()}>
            Forgot password?
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  );
}

export default LoginModal;
