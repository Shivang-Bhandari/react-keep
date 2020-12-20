import * as types from './actionTypes';

export const addNote = value => dispatch => dispatch({ type: types.ADD_NOTE, data: value });
