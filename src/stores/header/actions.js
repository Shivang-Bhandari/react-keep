import * as types from './actionTypes';

export const updateSearchValue = value => dispatch => dispatch({ type: types.UPDATE_SEARCH_VALUE, data: value });
export const updateActiveTab = data => dispatch => dispatch({ type: types.UPDATE_ACTIVE_TAB, data });
export const showSideMenu = () => dispatch => dispatch({ type: types.SIDEBAR_OPEN });
export const hideSideMenu = () => dispatch => dispatch({ type: types.SIDEBAR_CLOSE });
