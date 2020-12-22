import React from 'react';

import Note from '../Note';


import './NoteList.scss';

const NoteList = ({ allNotes, isSearchResults, editNote, dismissEditNote, handleEditSubmit }) => {
	// separate out pinned and other notes from active notes for tab
	const [pinnedNotes, otherNotes] = allNotes.reduce(([pinnedNotes, otherNotes], note) => {
		return note.pinned ? [[...pinnedNotes, note], otherNotes] : [pinnedNotes, [...otherNotes, note]];
	}, [[], []]);

	const toggleArchived = (note) => {
		const updatedNote = {
			...note,
			archived: !note.archived,
		}
		handleEditSubmit(updatedNote);
	}

	const togglePinned = (note) => {
		const updatedNote = {
			...note,
			pinned: !note.pinned,
		}
		handleEditSubmit(updatedNote);
	}

	const renderSearchResults = () => {
		return (
			<div className="note-list-notes">
				{ allNotes.map((note, i) => {
					return (<Note
						note={note}
						index={`${i}-pinned`}
						editNote={() => editNote(note)}
						dismissEditNote={dismissEditNote}
						toggleArchived={() => toggleArchived(note)}
						togglePinned={() => togglePinned(note)}
					/>)
				})}
			</div>
		);
	}

	const renderNotesWithCategories = () => {
		return(
			<>
				{pinnedNotes.length > 0 && (
					<>
						<div className="note-list-category">PINNED</div>
						<div className="note-list-notes">
							{pinnedNotes.map((note, i) => {
								return (<Note
									note={note}
									index={`${i}-pinned`}
									editNote={() => editNote(note)}
									dismissEditNote={dismissEditNote}
									toggleArchived={() => toggleArchived(note)}
									togglePinned={() => togglePinned(note)}
								/>)
							})}
						</div>
					</>
				)}
				
				{otherNotes.length > 0 && (
					<>
						<div className="note-list-category">OTHERS</div>
						<div className="note-list-notes">
							{otherNotes.map((note, i) => {
								return (<Note
									note={note}
									index={`${i}-pinned`}
									editNote={() => editNote(note)}
									dismissEditNote={dismissEditNote}
									toggleArchived={() => toggleArchived(note)}
									togglePinned={() => togglePinned(note)}
								/>)
							})}
						</div>
					</>
				)}
			</>
		)
	}

	const renderNotes = () => {
		if (!allNotes.length) return (<span>No Notes Found!</span>);
		return !isSearchResults ? renderNotesWithCategories() : renderSearchResults();
	}

	return (
		<div className="note-list">
			{renderNotes()}
		</div>
	);
};

export default NoteList;