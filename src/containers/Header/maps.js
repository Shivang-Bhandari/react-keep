import * as headerSeletors from '../../stores/header/selectors';
import * as headerActions from '../../stores/header/actions';
import { bindActionCreators } from 'redux';

export const stateToProps = state => {
    return {
        activeTab: headerSeletors.getActiveTab(state),
        searchValue: headerSeletors.getSearchValue(state),
        sideBarOpen: headerSeletors.getSideBarOpen(state)
    };
};

export const dispatchToProps = dispatch => {
    return bindActionCreators(
        {
            updateSearchValue: headerActions.updateSearchValue,
            updateActiveTab: headerActions.updateActiveTab,
            showSideMenu: headerActions.showSideMenu,
            hideSideMenu: headerActions.hideSideMenu,
        },
        dispatch
    );
};