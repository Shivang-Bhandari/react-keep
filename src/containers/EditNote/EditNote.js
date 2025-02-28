import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './EditNote.scss';

/**
 * Component to render contents of a note
 * @component
 * @param {Object} props
 * @param {Object} props.note
 * @param {() => {}} props.onSubmit
 * @param {() => {}} props.onClose
 * @param {() => {}} props.onDelete
 * @example
 * <EditNote
		note={note}
		onSubmit={onSubmit}
		onClose={onClose}
		onDelete={onDelete}
	/>
 *
 */
const EditNote = ({ note, onSubmit, onClose, onDelete }) => {

	const [title, setTitle] = useState(note.title);
	const [description, setDescription] = useState(note.description);

	const stopPropagation = e => {
			e.stopPropagation()
	}

	const handleSubmit = e => {
			e.preventDefault()
			const updatedNote = {
				...note,
				title,
				description,
			}
			onSubmit(updatedNote);
	}

	const handleDelete = e => {
			e.preventDefault()
			if (window.confirm('Delete this note?')) {
				onDelete(note);
			}
	} 

	const renderForm = React.useCallback(() => (
		<div
			className="edit-note"
			role="dialog"
			aria-labelledby="modalTitle"
			aria-describedby="modalContent"
		>
			<form
				onClick={stopPropagation}
				className="edit-note-form"
			>
				<input
					id="edit-note-title"
					className="edit-note-title"
					onChange={e => setTitle(e.target.value)}
					name="title"
					value={title}
					placeholder="Title"
				/>

				<textarea
					id="edit-note-description"
					className="edit-note-description"
					onChange={e => setDescription(e.target.value)}
					value={description}
					name="content"
					placeholder="Add a note..."
					rows="8"
				/>

				<footer className="edit-note-menu">
					<button
						onClick={handleDelete}
						type="button"
						className="edit-note-menu-delete"
					>
						delete
										</button>
					<button onClick={handleSubmit} className="edit-note-menu-submit">
						<span>Done</span>
					</button>
				</footer>
			</form>
		</div>
	), [title, description, handleDelete, handleSubmit]);

	return (
		<div>
			{note && (
				<div
					className="edit-note-overlay"
					onClick={onClose}
					id="modalBox"
				>
						{renderForm()}
				</div>
			)}
		</div>
	);

};

EditNote.propTypes = {
	note: PropTypes.shape({
		id: PropTypes.string,
		archived: PropTypes.bool,
		pinned: PropTypes.bool,
		title: PropTypes.string,
		description: PropTypes.string,
	}),
	onSubmit: PropTypes.func,
	onClose: PropTypes.func,
	onDelete: PropTypes.func,
};

EditNote.defaultProps = {
	note: {
		id: '123',
		archived: false,
		pinned: false,
		title: '',
		description: '',
	},
	onSubmit: () => { },
	onClose: () => { },
	onDelete: () => { },
};

export default EditNote;