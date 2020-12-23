import React from 'react';

import Note from '../Note';

import './NoteList.scss';

/**
 * Component to render the list of added notes
 * @component
 * @param {Object} props
 * @param {Object[]} props.allNotes
 * @param {boolean} props.isSearchResults
 * @param {() => {}} props.editNote
 * @param {() => {}} props.dismissEditNote
 * @param {() => {}} props.handleEditSubmit
 * @param {() => {}} props.onDelete
 * @example
 * <NoteList
		allNotes={allNotes}
		isSearchResults={isSearchResults}
		editNote={editNote}
		dismissEditNote={dismissEditNote}
		handleEditSubmit={handleEditSubmit}
		onDelete={onDelete}
	/>
 *
 */
const NoteList = ({ allNotes, isSearchResults, editNote, dismissEditNote, handleEditSubmit, onDelete }) => {
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
						index={`${i}-search`}
						editNote={() => editNote(note)}
						dismissEditNote={dismissEditNote}
						toggleArchived={() => toggleArchived(note)}
						togglePinned={() => togglePinned(note)}
						onDelete={onDelete}
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
									onDelete={onDelete}
								/>)
							})}
						</div>
					</>
				)}
				
				{otherNotes.length > 0 && (
					<>
						{pinnedNotes.length > 0 && (
							<div className="note-list-category">OTHERS</div>	
						)}
						<div className="note-list-notes">
							{otherNotes.map((note, i) => {
								return (<Note
									note={note}
									index={`${i}-others`}
									editNote={() => editNote(note)}
									dismissEditNote={dismissEditNote}
									toggleArchived={() => toggleArchived(note)}
									togglePinned={() => togglePinned(note)}
									onDelete={onDelete}
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

NoteList.propTypes = {
	allNotes: PropTypes.arrayof(
		PropTypes.shape({
			id: PropTypes.string,
			archived: PropTypes.bool,
			pinned: PropTypes.bool,
			title: PropTypes.string,
			description: PropTypes.string,
		})
	),
	isSearchResults: PropTypes.bool,
	editNote: PropTypes.func,
	dismissEditNote: PropTypes.func,
	handleEditSubmit: PropTypes.func,
	onDelete: PropTypes.func,
}

NoteList.defaultProps = {
	allNotes: [],
	isSearchResults: false,
	editNote: () => { },
	dismissEditNote: () => { },
	handleEditSubmit: () => { },
	onDelete: () => { },
}

export default NoteList;