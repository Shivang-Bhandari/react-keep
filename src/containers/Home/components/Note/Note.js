import React from 'react';

import './Note.scss';


const Note = ({ note, index, editNote, toggleArchived, togglePinned }) => {
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

	return (
		<div className="note-menu-items" style={menuStyles}>
			<div
				onClick={(e) => handleTogglePinned(e)}
				className="note-menu-item"
			>
				{note.pinned ? 'Unpin' : 'Pin'}
			</div>
			<div
				onClick={(e) => handleToggleArchived(e)}
				className="note-menu-item"
			>
				{note.archived ? 'Unarchive' : 'Archive'}
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

export default Note;