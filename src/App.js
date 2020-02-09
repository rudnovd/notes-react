import './css/reset.css';
import './css/fonts.css';
import './css/main.css';

import React, { useState, useEffect } from 'react';
import * as firebase from "firebase/app";

import LoadingSpinner from './components/Base/LoadingSpinner'
import NotesPage from 'views/Notes/Notes';

function App() {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    firebase.auth().onAuthStateChanged(user => {
      if (user) setUser(user.toJSON())
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <LoadingSpinner show={loading} size="5rem" />
  } else {
    return <NotesPage user={user} onLogout={() => setUser({})} />
  }
}

export default App;
