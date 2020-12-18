import * as types from './actionTypes';


const initialState = {
    notes: [],
    sideMenuOpen: false,
    searchValue: '',
    isArchivedSection: false,
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        default:
            return state;
    }
}