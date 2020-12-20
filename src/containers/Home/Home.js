import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { stateToProps, dispatchToProps } from './maps';

import NoteComposer from './components/NoteComposer';
import NoteList from './components/NoteList';

import './Home.scss';

const Home = () => {
    const { allNotes, searchValue } = useSelector(stateToProps);
    const { addNote } = dispatchToProps(useDispatch());

    const filterNote = note => {
        const titleHasSearchKeyword = note.title.indexOf(searchValue) > -1;
        const descriptionHasSearchKeyword = note.description.indexOf(searchValue) > -1;

        if (titleHasSearchKeyword || descriptionHasSearchKeyword )
            return true
    }

    const getActiveNotes = React.useCallback(() => {
        if(!searchValue) return allNotes;
        return allNotes.filter(filterNote)
    }); 

    return (
        <div className="home"
        >
            <NoteComposer addNote={addNote} />
            <NoteList allNotes={getActiveNotes()} />

        </div>
    )
};

export default Home;
