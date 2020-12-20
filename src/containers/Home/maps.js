import * as notesSelectors from '../../stores/notes/selectors';
import * as headerSeletors from '../../stores/header/selectors';
import * as notesActions from '../../stores/notes/actions';
import { bindActionCreators } from 'redux';

export const stateToProps = state => {
    return {
        allNotes: notesSelectors.getAllNotes(state),
        searchValue: headerSeletors.getSearchValue(state),
    };
};

export const dispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addNote: notesActions.addNote,
        },
        dispatch
    );
};