import React from 'react';

import './Note.scss';


const Note = ({ title, description, index, editNote }) => {
	const [isHovered, setIsHovered] = React.useState(false);

	const renderTitle = React.useCallback(() => {
	if (!title) return null;
	return (
		<h1 className="note-title">{title}</h1>
	)
}, [title]);

const renderDescription = React.useCallback(() => {
	if(!description) return null;
	return (
		<div className="note-description">{description}</div>
	)
}, [description]);

const renderMenuItems = React.useCallback(() => {
	const menuStyles = {
		visibility: isHovered ? 'visible' : 'hidden',
	}
	return (
		<div className="note-menu-items" style={menuStyles}>
			<div
				// onClick={(e) => { handleSubmit(e, true) }}
				className="note-menu-item"
			>
				Pin
			</div>
			<div
				// onClick={(e) => { handleSubmit(e, false, true) }}
				className="note-menu-item"
			>
				Archive
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