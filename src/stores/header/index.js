import * as types from './actionTypes';


const initialState = {
    sideBarOpen: false,
    searchValue: '',
    activeTab: 'notes',
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_SEARCH_VALUE:
            console.log(action.data.value)
            return state = {
                ...state,
                searchValue: action.data,
            };
        case types.UPDATE_ACTIVE_TAB:
            return state = {
                ...state,
                activeTab: action.data,
            };
        case types.SIDEBAR_OPEN:
            return state = {
                ...state,
                sideBarOpen: true,
            };
        case types.SIDEBAR_CLOSE:
            return state = {
                ...state,
                sideBarOpen: false,
            };
        default:
            return state;
    }
}