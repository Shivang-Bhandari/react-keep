import * as types from './actionTypes';

const initialState = {
	allNotes: JSON.parse(localStorage.getItem('allNotes')) || [
		{ id: "yquepd1", title: "title 1", description: "wow 2134", pinned: false, archived: false },
		{ id: "yquepd2", title: "title 2", description: "asdawow 2134sd", pinned: false, archived: false },
		{ id: "yquepd4", title: "title 4", description: "wow 2134", pinned: true, archived: false },
		{ id: "yquepd5", title: "pinned archived", description: "wow 2134", pinned: true, archived: true },
		{ id: "yquepd6", title: "title 8", description: "wow 2134", pinned: false, archived: true },
		{ id: "yquepd7", title: "title 9", description: "wow 2134", pinned: false, archived: true },
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
			console.log(action.data);
			const updatedAllNotes = state.allNotes.map(note => note.id === action.data.id ? action.data : note);
			localStorage.setItem('allNotes', JSON.stringify([...state.allNotes, action.data]));
			return state = {
				...state,
				allNotes: updatedAllNotes,
			}

		case types.DELETE_NOTE: {
			console.log(action.data);
			const updatedAllNotes = state.allNotes.filter(note => note.id !== action.data.id)
			localStorage.setItem('allNotes', JSON.stringify([...state.allNotes, action.data]));
			return state = {
				...state,
				allNotes: updatedAllNotes,
			}
		}

		case types.EDIT_NOTE_ACTIVE:
			console.log(action.data);
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