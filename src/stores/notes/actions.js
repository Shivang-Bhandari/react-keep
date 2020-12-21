import * as types from './actionTypes';

export const addNote = value => dispatch => dispatch({ type: types.ADD_NOTE, data: value });
export const editNoteActive = data => dispatch => dispatch({ type: types.EDIT_NOTE_ACTIVE, data })
export const editNoteInactive = () => dispatch => dispatch({ type: types.EDIT_NOTE_INACTIVE })
export const updateNote = (data) => dispatch => dispatch({ type: types.UPDATE_NOTE, data })
export const deleteNote = (data) => dispatch => dispatch({ type: types.DELETE_NOTE, data })