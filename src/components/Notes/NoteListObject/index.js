import React from 'react';

import './NoteListObject.css';

function NoteListObject(props) {
  let note
  
  if (props.noteData.title || props.noteData.text) {
    note = 
    <>
      <span className="note-title">
        { props.noteData.title }
      </span>

      <div className="note-text">
        { props.noteData.text }
      </div>
    </>
  } else {
    note = <div className="note-placeholder">New note...</div>
  }
  
  return (
    <div className={props.active ? "note active" : "note"} onClick={() => props.onClick(props.noteData)}>
      {note}
    </div>
  );
}

export default NoteListObject;
