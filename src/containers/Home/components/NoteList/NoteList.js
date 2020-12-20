import React from 'react';

import Note from '../Note';


import './NoteList.scss';

const NoteList = ({ allNotes }) => {
    const renderNotes = () => {
        if(!allNotes.length) return (<span>No Notes Found!</span>);
        return allNotes.map((note, i) => (
            <Note
                title={note.title}
                description={note.description}
                index={i}
            />
        ));
    }
    return (
        <div className="note-list">
            {renderNotes()}
        </div>
    );
};

export default NoteList;