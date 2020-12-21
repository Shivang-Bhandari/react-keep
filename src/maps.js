import * as notesSelectors from './stores/notes/selectors';
import * as notesAction from './stores/notes/actions';
import { bindActionCreators } from 'redux';

export const stateToProps = state => {
    return {
        noteToEdit: notesSelectors.getNoteToEdit(state),
    };
};

export const dispatchToProps = dispatch => {
    return bindActionCreators(
        {
            editNoteActive: notesAction.editNoteActive,
            editNoteInactive: notesAction.editNoteInactive,
            updateNote: notesAction.updateNote,
            deleteNote: notesAction.deleteNote,
        },
        dispatch
    );
};