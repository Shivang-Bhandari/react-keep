import React from 'react';

import Note from '../Note';


import './NoteList.scss';

const NoteList = ({ allNotes, isSearchResults }) => {
    // separate out pinned and other notes from active notes for tab
    const [pinnedNotes, otherNotes] = allNotes.reduce(([pinnedNotes, otherNotes], note) => {
        return note.pinned ? [[...pinnedNotes, note], otherNotes] : [pinnedNotes, [...otherNotes, note]];
    }, [[], []]);

    const renderNotes = () => {
        if (!allNotes.length) return (<span>No Notes Found!</span>);

        return !isSearchResults ? (
            <>
            <div className="note-list-category">PINNED</div>
            <div className="note-list-notes">
                { pinnedNotes.map((note, i) => {
                    return (<Note
                        title={note.title}
                        description={note.description}
                        index={`${i}-pinned`}
                        key={`${i}-pinned`}
                    />)
                })}
            </div>
            <div className="note-list-category">OTHERS</div>
            <div className="note-list-notes">
                { otherNotes.map((note, i) => {
                    return (<Note
                        title={note.title}
                        description={note.description}
                        index={`${i}-pinned`}
                        key={`${i}-pinned`}
                    />)
                })}
            </div>
            </>
        ) : (
                <div className="note-list-notes">
                    { allNotes.map((note, i) => {
                        return (<Note
                            title={note.title}
                            description={note.description}
                            index={`${i}-pinned`}
                            key={`${i}-pinned`}
                        />)
                    })}
                </div>
        )
    }

    return (
        <div className="note-list">
            {renderNotes()}
        </div>
    );
};

export default NoteList;