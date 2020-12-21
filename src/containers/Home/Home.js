import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { stateToProps, dispatchToProps } from './maps';

import NoteComposer from './components/NoteComposer';
import NoteList from './components/NoteList';

import './Home.scss';

const Home = ({ editNote, dismissEditNote }) => {
    const { allNotes, searchValue, activeTab } = useSelector(stateToProps);
    const { addNote } = dispatchToProps(useDispatch());

    const filterNote = note => {
        const titleHasSearchKeyword = note.title.indexOf(searchValue) > -1;
        const descriptionHasSearchKeyword = note.description.indexOf(searchValue) > -1;

        if (titleHasSearchKeyword || descriptionHasSearchKeyword )
            return true
    }

    const [archivedNotes, activeNotes] = allNotes.reduce(([archivedNotes, activeNotes], note) => {
        return note.archived ? [[...archivedNotes, note], activeNotes] : [archivedNotes, [...activeNotes, note]];
    }, [[], []]);
    
    const notesForActiveTab = activeTab === 'archived' ? archivedNotes : activeNotes;

    const getActiveNotes = React.useCallback(() => {
        if (!searchValue) {
            console.log('returning:::::', notesForActiveTab); return notesForActiveTab;}
        return allNotes.filter(filterNote);
    });

    return (
        <div className="home"
        >
            <NoteComposer addNote={addNote} />
            <NoteList
                allNotes={getActiveNotes()}
                isSearchResults={searchValue.length > 0}
                editNote={editNote}
                dismissEditNote={dismissEditNote}
            />

        </div>
    )
};

export default Home;
