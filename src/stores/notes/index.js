import * as types from './actionTypes';

const initialState = {
	allNotes: JSON.parse(localStorage.getItem('allNotes')) || [
		{ id: "yquepd1", title: "Note 1", description: "description", pinned: false, archived: false },
		{ id: "yquepd2", title: "Note 2", description: "description 2", pinned: false, archived: false },
		{ id: "yquepd4", title: "Note 3", description: "description 3", pinned: true, archived: false },
		{ id: "yquepd5", title: "pinned archived", description: "archived description", pinned: true, archived: true },
		{ id: "yquepd6", title: "Archived 1", description: "Archived description 2", pinned: false, archived: true },
		{ id: "yquepd7", title: "Archived 2", description: "Archived description 3", pinned: false, archived: true },
	],
	noteToEdit: JSON.parse(localStorage.getItem('noteToEdit')) || null,
};

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.ADD_NOTE:
			localStorage.setItem('allNotes', JSON.stringify([...state.allNotes, action.data]));
			return state = {
				...state,
				allNotes: [...state.allNotes, action.data],
			};

		case types.UPDATE_NOTE:
			const updatedAllNotes = state.allNotes.map(note => note.id === action.data.id ? action.data : note);
			localStorage.setItem('allNotes', JSON.stringify([...state.allNotes, action.data]));
			return state = {
				...state,
				allNotes: updatedAllNotes,
			}

		case types.DELETE_NOTE: {
			const updatedAllNotes = state.allNotes.filter(note => note.id !== action.data.id)
			localStorage.setItem('allNotes', JSON.stringify([...state.allNotes, action.data]));
			return state = {
				...state,
				allNotes: updatedAllNotes,
			}
		}

		case types.EDIT_NOTE_ACTIVE:
			localStorage.setItem('noteToEdit', JSON.stringify(action.data));
			return state = {
				...state,
				noteToEdit: action.data,
			}

		case types.EDIT_NOTE_INACTIVE:
			localStorage.setItem('noteToEdit', null);
			return state = {
				...state,
				noteToEdit: null,
			}

		default:
			return state;
	}
}