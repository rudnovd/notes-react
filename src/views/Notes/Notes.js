import React, { useState, useEffect, useRef } from 'react';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import LoginModal from 'components/Modals/LoginModal';
import RegistrationModal from 'components/Modals/RegistrationModal';
import ResetPasswordModal from 'components/Modals/ResetPasswordModal';
import NoteListObject from 'components/Notes/NoteListObject';

import { logout } from 'services/api/account';
import { getNotes, postNote, putNote, deleteNote } from 'services/api/notes';

import dayjs from 'dayjs'

import "./Notes.css";
import "./Navbar.css";
import BaseButton from 'components/Base/BaseButton';

function NotesPage(props) {
  const [notes, setNotes] = useState([])
  const [getLoding, setGetLoading] = useState(false)
  const [getError, setGetError] = useState("")
  useEffect(() => {
    if (props.user.uid) {
      setGetLoading(true)
      getNotes(props.user.uid)
      .then(response => {
          const data = []
          response.forEach(note => {
            data.push({
              id: note.id,
              ...note.data()
            })
          })
          sortNotes(data)
        })
      .catch(error => {
        console.error(error)
        setGetError(error.message)
      })
      .finally(() => {
        setGetLoading(false)
      })
    } else {
      onShowLoginModal()
    }
  }, [props.user.uid])

  const [activeNote, setActiveNote] = useState({})
  function selectNote (note) {
    setActiveNote(note)
  }

  const activeNoteInput = useRef(null);
  useEffect(() => {
    if (activeNote.id && !activeNote.text.length) {
      activeNoteInput.current.focus();
    }
  }, [activeNote.id])

  const activeNoteTextarea = useRef(null);
  useEffect(() => {
    if (activeNote.id && activeNote.title.length) {
      activeNoteTextarea.current.focus();
    }
  }, [activeNote.id])

  const [inputTimeout, setInputTimeout] = useState("")
  const [putLoading, setPutLoading] = useState(false)
  const [putError, setPutError] = useState("")
  function onChangeNoteText (event) {
    changeTextAreaHeight()

    const editedNote = {
      ...activeNote
    }
    
    if (event.target.tagName === "INPUT") {
      editedNote.title = event.target.value
    } else {
      editedNote.text = event.target.value
    }

    const activeNoteIndex = notes.findIndex(item => item.id === editedNote.id)
    const notesCopy = [...notes]
    notesCopy.splice(activeNoteIndex, 1, editedNote)

    setNotes(notesCopy)
    setActiveNote(editedNote)

    clearTimeout(inputTimeout)
    setInputTimeout(setTimeout(() => {
      setPutLoading(true)
      putNote(editedNote)
        .then(() => {
          editedNote.edited = Date.now()
          const activeNoteIndex = notes.findIndex(item => item.id === editedNote.id)
          const notesCopy = [...notes]
          notesCopy.splice(activeNoteIndex, 1, editedNote)
          sortNotes(notesCopy)
        })
        .catch(error => {
          console.error(error)
          setPutError(error.message)
        })
        .finally(() => {
          setPutLoading(false)
          console.log(putLoading)
        })
    }, 1000))
  }

  function changeTextAreaHeight () {
    activeNoteTextarea.current.style.height = "5px";
    activeNoteTextarea.current.style.height = `${activeNoteTextarea.current.scrollHeight}px`;
  }

  const [postLoading, setPostLoading] = useState(false)
  const [postError, setPostError] = useState("")
  async function createNewNote() {
    const newNote = {
      title: "",
      text: "",
      ownerId: props.user.uid
    }

    setPostLoading(true)
    postNote(newNote)
      .then(newNoteId => {
        newNoteId.get()
          .then(newNoteData => {
            newNoteData = {
              id: newNoteData.id,
              ...newNoteData.data()
            }

            setNotes([...notes, newNoteData])
            setActiveNote(newNoteData)
            sortNotes(notes)
          })
          .catch(error => {
            console.error(error)
          })

      })
      .catch(error => {
        console.error(error)
        setPostError(error.message)
      })
      .finally(() => {
        setPostLoading(false)
      })
  }

  const [searchText, setSearchText] = useState("")
  
  function sortNotes(notesArray) {
    setNotes(notesArray.sort((a, b) => {
      return new Date(b.edited) - new Date(a.edited);
    }))
  }

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  function onDeleteNote() {
    setDeleteLoading(true)
    deleteNote(activeNote)
      .then(() => {
        const notesWithoutDeleted = notes.filter(item => item.id !== activeNote.id)
        setNotes(notesWithoutDeleted)
        setActiveNote({})
      })
      .catch(error => {
        console.error(error)
        setDeleteError(error.message)
      })
      .finally(() => {
        setDeleteLoading(false)
      })
  }

  function onLogin() {
    setShowLoginModal(false)
  }

  function onResetPassword() {
    setShowResetPasswordModal(false)
  }

  const [logoutLoading, setLogoutLoading] = useState(false)
  const [logoutError, setLogoutError] = useState("")
  function onLogout() {
    setLogoutLoading(true)
    logout()
      .then(() => {
        setNotes([])
        setActiveNote({})
        props.onLogout()
      })
      .catch(error => {
        console.error(error)
        setLogoutError(error.message)
      })
      .finally(() => {
        setLogoutLoading(false)
      })
  }

  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  function onShowRegistrationModal() {
    setShowLoginModal(false)
    setShowRegistrationModal(true)
  }

  const [showLoginModal, setShowLoginModal] = useState(false)
  function onShowLoginModal() {
    setShowLoginModal(true)
    setShowRegistrationModal(false)
    setShowResetPasswordModal(false)
  }

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  function onShowResetPasswordModal() {
    setShowResetPasswordModal(true)
    setShowLoginModal(false)
    setShowRegistrationModal(false)
  }

  const [userNotes, setUserNotes] = useState()
  useEffect(() => {
    if (getLoding) {
      setUserNotes(
        <div className="loading-section">
          <LoadingSpinner show={getLoding} width="3rem" height="3rem" />
        </div>
      )
    } else if (getError) {
      setUserNotes(<div className="error-section">{getError}</div>)
    } else if (!searchText.length) {
      setUserNotes(notes.map(note =>
        <NoteListObject onClick={selectNote} key={note.id} noteData={note} active={note.id === activeNote.id} />
      ))
    } else if (searchText.length) {
      const searchFiltered = notes.filter(note => {
        const noteTitle = note.title.toLowerCase()
        const noteText = note.text.toLowerCase()
        const search = searchText.toString().toLowerCase()
        return noteTitle.search(search) > -1 || noteText.search(search) > -1
      })
      
      setUserNotes(searchFiltered.map(note =>
        <NoteListObject onClick={selectNote} key={note.id} noteData={note} active={note.id === activeNote.id} />
      ))
    }
  }, [getLoding, getError, notes, searchText])
  
  return (
    <main className="container">
      <nav className="navbar">
        <div className="list-actions">
          <div className="search-note">
            <input className="search-note-input" type="text" onKeyUp={event => setSearchText(event.target.value)} />
          </div>
          <div className="delete-note">
            {activeNote.id &&
              <BaseButton
                className="delete-note-button"
                title="delete note"
                loading={deleteLoading}
                onClick={onDeleteNote} 
              />
            }
          </div>
          <div className="new-note">
            <BaseButton
              className="new-note-button"
              title="Add new note"
              loading={postLoading}
              onClick={createNewNote}
            />
          </div>
        </div>

        <div className="note-actions">
          <div className="user-button">
            {props.user.uid &&
              <BaseButton
                className="logout-button"
                title="logout"
                loading={logoutLoading}
                onClick={onLogout} 
              />
            }
            {!props.user.uid && <button className="login-button" title="login" onClick={() => setShowLoginModal(true)} />}
          </div>
        </div>
      </nav>

      <section className="notes">
        <div className="notes-list">
          { userNotes }
        </div>
        <div className="notes-active-note">
          <h4 className="active-note-title">
            {activeNote.id && 
              <input
                type="text"
                className="note-title-input"
                value={activeNote.title}
                ref={activeNoteInput}
                onChange={onChangeNoteText}
              />
            }
          </h4>
          <div className="active-note-text">
            {!activeNote.id &&
              <span>Select note...</span>
            }

            {activeNote.id && 
              <textarea
                className="note-text-input"
                onChange={onChangeNoteText}
                onFocus={changeTextAreaHeight}
                value={activeNote.text}
                ref={activeNoteTextarea}
                maxLength="10000"
                spellCheck="true"
              />
            }
          </div>

          <div className="active-note-status">
          <LoadingSpinner show={putLoading} size="1rem" />
            
            <div className="active-note-status-time">
            {activeNote.edited && (activeNote.title || activeNote.text) &&
              <span>
                Редактировано: {dayjs(activeNote.edited).format('DD.MM.YYYY HH:mm:ss')}
              </span>
            }
            </div>
          </div>
        </div>
      </section>

      <LoginModal show={showLoginModal} showRegistrationModal={onShowRegistrationModal} showResetPasswordModal={onShowResetPasswordModal}  onLogin={onLogin} />
      <RegistrationModal show={showRegistrationModal} onClose={onShowLoginModal} />
      <ResetPasswordModal show={showResetPasswordModal} onResetPassword={onResetPassword} onClose={onShowLoginModal} />
    </main>
  );
}

export default NotesPage;
