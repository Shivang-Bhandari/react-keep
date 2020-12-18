import * as headerSeletors from '../../stores/header/selectors';
import * as headerActions from '../../stores/header/actions';
import { bindActionCreators } from 'redux';

export const stateToProps = state => {
    return {
        activeTab: headerSeletors.getActiveTab(state),
        sideBarOpen: headerSeletors.getSideBarOpen(state)
    };
};

export const dispatchToProps = dispatch => {
    return bindActionCreators(
        {
            hideSideMenu: headerActions.hideSideMenu,
            updateActiveTab: headerActions.updateActiveTab,
        },
        dispatch
    );
};