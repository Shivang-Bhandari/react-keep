import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { stateToProps, dispatchToProps } from './maps';

import Header from './containers/Header';
import SideBar from './containers/SideBar';
import Home from './containers/Home';
import EditNote from './containers/EditNote';

import './App.scss';

const App = () => {
  const { noteToEdit } = useSelector(stateToProps);
  const {
    editNoteActive,
    editNoteInactive,
    updateNote,
    deleteNote,
  } = dispatchToProps(useDispatch());

  const [renderEditNote, setRenderEditNote] = React.useState(!!(noteToEdit));

  const editNote = note => {
    setRenderEditNote(true);
    editNoteActive(note);
  }

  const closeEditNote = () => {
    setRenderEditNote(false);
    editNoteInactive();
  }

  const handleEditSubmit = updatedNote => {
    updateNote(updatedNote);
    closeEditNote();
  }

  const handleDeleteNote = noteToDelte => {
    deleteNote(noteToDelte);
    closeEditNote();
  }

  const dismissEditNote = () => {
    closeEditNote();
  }

  return (
    <div className="App">
      <SideBar />
      <Header />
      <Home
        editNote={editNote}
        dismissEditNote={dismissEditNote}
        handleEditSubmit={handleEditSubmit}
      />
      {
        renderEditNote &&
        noteToEdit &&
        <EditNote
          note={noteToEdit}
          onSubmit={handleEditSubmit}
          onClose={dismissEditNote}
          onDelete={handleDeleteNote}
        />
      }
    </div>
  );
}

export default App;
