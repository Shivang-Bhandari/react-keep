import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { stateToProps, dispatchToProps } from './maps';

import NoteComposer from './components/NoteComposer';
import NoteList from './components/NoteList';

import './Home.scss';

/**
 * Component to render the home section of react-keep
 * this includes the note composer as well as the note list
 * @component
 * @param {Object} props
 * @param {() => {}} props.editNote
 * @param {() => {}} props.dismissEditNote
 * @param {() => {}} props.handleEditSubmit
 * @param {() => {}} props.onDelete
 * @example
 * <Home
    editNote={editNote}
    dismissEditNote={dismissEditNote}
    handleEditSubmit={handleEditSubmit}
    onDelete={onDelete}
  />
 *
 */
const Home = ({ editNote, dismissEditNote, handleEditSubmit, onDelete }) => {
	const { allNotes, searchValue, activeTab } = useSelector(stateToProps);
	const { addNote } = dispatchToProps(useDispatch());

	/**
	 * a function to filter notes based on search
	 * @param {Object} note
	 */
	const filterNote = note => {
		const titleHasSearchKeyword = note.title.indexOf(searchValue) > -1;
		const descriptionHasSearchKeyword = note.description.indexOf(searchValue) > -1;

		if (titleHasSearchKeyword || descriptionHasSearchKeyword)
			return true
	}

	// since there are two sections in home screen
	// reducing to split allNotes into archived and active notes
	const [archivedNotes, activeNotes] = allNotes.reduce(([archivedNotes, activeNotes], note) => {
		return note.archived ? [[...archivedNotes, note], activeNotes] : [archivedNotes, [...activeNotes, note]];
	}, [[], []]);

	const notesForActiveTab = activeTab === 'archived' ? archivedNotes : activeNotes;

	const getActiveNotes = React.useCallback(() => {
		if (!searchValue)
			return notesForActiveTab;
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
				handleEditSubmit={handleEditSubmit}
				onDelete={onDelete}
			/>

		</div>
	)
};


Home.propTypes = {
	editNote: PropTypes.func,
	dismissEditNote: PropTypes.func,
	handleEditSubmit: PropTypes.func,
	onDelete: PropTypes.func,
};

Home.defaultProps = {
	editNote: () => {},
	dismissEditNote: () => {},
	handleEditSubmit: () => {},
	onDelete: () => {},
};

export default Home;
