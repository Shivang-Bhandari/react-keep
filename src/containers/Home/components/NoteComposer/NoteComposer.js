import React from 'react';
import PropTypes from 'prop-types';

import { autoResize } from './utils';

import './NoteComposer.scss';

/**
 * Component to compose new notes
 * @component
 * @param {Object} props
 * @param {() => {}} props.addNote
 * @example
 * <NoteComposer
		addNote={addNote}
	/>
 *
 */
const NoteComposer = ({ addNote }) => {
	const [titleFieldVisible, setTitleFieldVisible] = React.useState(false);
	const [value, setValue] = React.useState('');
	const [noteValue, setNoteValue] = React.useState('');
	const [isHovered, setIsHovered] = React.useState(false);

	React.useEffect(() => {
		document.addEventListener('input', event => {
			if (event.target.tagName.toLowerCase() !== 'textarea') return;
			autoResize(event.target);
		}, false);

	}, [])

	const showTitleField = () => {
		setTitleFieldVisible(true)
	}

	const hideTitleField = () => {
		if (!value.length)
			setTitleFieldVisible(false)
	}

	const handleSubmit = (e, isPinned = false, isArchived = false) => {
		e.preventDefault();
		if (!value && !noteValue) {
			setTitleFieldVisible(false);
			return;
		}	
		const noteData = {
			id: Math.random()
				.toString(36)
				.substring(7),
			title: value,
			description: noteValue,
			pinned: isPinned,
			archived: isArchived,
		};

		addNote(noteData);
		setValue('');
		setNoteValue('')
		setTitleFieldVisible(false);
	}

	const renderMenuItems = () => {
		const menuStyles = {
			visibility: isHovered ? 'visible' : 'hidden',
		}
		return (
			<div className="note-composer-menu-items" style={menuStyles}>
				<div
					onClick={(e) => { handleSubmit(e, true) }}
					className="note-composer-menu-item"
				>
					Pin
				</div>
				<div onClick={handleSubmit} className="note-composer-menu-item">
					Close
				</div>
				<div
					onClick={(e) => { handleSubmit(e, false, true) }}
					className="note-composer-menu-item"
				>
					Archive
				</div>
			</div>
		);
	};

	const renderNoteComposerOverlay = () => (
		<div className="note-composer-overlay" onClick={hideTitleField} />
	);

	const renderForm = () => {
		return (
			<form
				className="note-composer-form"
				onMouseEnter={() => { setIsHovered(true) }}
				onMouseLeave={() => { setIsHovered(false) }}
				onSubmit={handleSubmit}
			>
				{
					titleFieldVisible && (
						<div className="note-composer-title-wrapper">
							<input
								onFocus={showTitleField}
								className="note-composer-title"
								value={value}
								onChange={(e) => { setValue(e.target.value) }}
								placeholder="Title"
							/>
						</div>
					)
				}
				<textarea
					className="note-composer-textarea"
					value={noteValue}
					onChange={e => setNoteValue(e.target.value)}
					onFocus={showTitleField}
					name="content"
					placeholder="Take a note..."
				/>
				{renderMenuItems()}
			</form>
		)
	}

	return (
		<div className="note-composer">
			{titleFieldVisible && renderNoteComposerOverlay()}
			{renderForm()}
		</div>
	)
};

NoteList.propTypes = {
	addNote: PropTypes.func,
}

NoteList.defaultProps = {
	addNote: () => { },
}

export default NoteComposer;