import React from 'react';
import PropTypes from 'prop-types';

import './Note.scss';

/**
 * Component to render contents of a note
 * @component
 * @param {Object} props
 * @param {Object} props.note
 * @param {String} props.index
 * @param {() => {}} props.editNote
 * @param {() => {}} props.toggleArchived
 * @param {() => {}} props.togglePinned
 * @param {() => {}} props.onDelete
 * @example
 * <Note
		note={note}
		index={index}
		editNote={editNote}
		toggleArchived={dismissEditNote}
		togglePinned={handleEditSubmit}
		onDelete={onDelete}
	/>
 *
 */
const Note = ({ note, index, editNote, toggleArchived, togglePinned, onDelete }) => {
	const [isHovered, setIsHovered] = React.useState(false);

	const renderTitle = React.useCallback(() => {
	if (!note.title) return null;
	return (
		<h1 className="note-title">{note.title}</h1>
	)
}, [note]);

const renderDescription = React.useCallback(() => {
	if(!note.description) return null;
	return (
		<div className="note-description">{note.description}</div>
	)
}, [note]);

const renderMenuItems = React.useCallback(() => {
	const menuStyles = {
		visibility: isHovered ? 'visible' : 'hidden',
	}

	const handleTogglePinned = (e) => {
		e.stopPropagation();
		togglePinned();
	}
	const handleToggleArchived = (e) => {
		e.stopPropagation();
		toggleArchived();
	}

	const handleDelete = (e) => {
		e.preventDefault()
		if (window.confirm('Delete this note?')) {
			onDelete(note);
		}
	}

	return (
		<div className="note-menu-items" style={menuStyles}>
			<div
				onClick={(e) => handleTogglePinned(e)}
				className="note-menu-item"
			>
				{note.pinned ? 'UNPIN' : 'PIN'}
			</div>
			<div
				onClick={(e) => handleToggleArchived(e)}
				className="note-menu-item"
			>
				{note.archived ? 'UNARCHIVE' : 'ARCHIVE'}
			</div>
			<div
				onClick={(e) => handleToggleArchived(e)}
				className="note-menu-item"
			>
				DELETE
			</div>
		</div>
	);
}, [isHovered])

return (
		<div 
		onMouseEnter={() => { setIsHovered(true) }}
		onMouseLeave={() => { setIsHovered(false) }}
		index={index} className="note" onClick={editNote}>
			{renderTitle()}
			{renderDescription()}
			{renderMenuItems()}
		</div>
	)
}

NoteList.propTypes = {
	note: PropTypes.shape({
			id: PropTypes.string,
			archived: PropTypes.bool,
			pinned: PropTypes.bool,
			title: PropTypes.string,
			description: PropTypes.string,
		}),
	index: PropTypes.string,
	editNote: PropTypes.func,
	dismissEditNote: PropTypes.func,
	handleEditSubmit: PropTypes.func,
	onDelete: PropTypes.func,
};

NoteList.defaultProps = {
	note: {
		id: '123',
		archived: false,
		pinned: false,
		title: '',
		description: '',
	},
	index: '1',
	editNote: () => { },
	dismissEditNote: () => { },
	handleEditSubmit: () => { },
	onDelete: () => { },
};

export default Note;