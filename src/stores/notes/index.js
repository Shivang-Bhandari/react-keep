import * as types from './actionTypes';


const initialState = {
    allNotes: [
        {id: "yquepd", title: "lol title 1", description: "wow 2134", pinned: false, archived: false},
        {id: "yquepd", title: "lol title 2", description: "asdawow 2134sd", pinned: false, archived: false},
        {id: "yquepd", title: "lol title 3", description: "wow 2134", pinned: false, archived: false},
        {id: "yquepd", title: "lol title 4", description: "wow 2134", pinned: false, archived: false}
    ],
    archivedNotes: [],
    activeNotes: [],
    pinnedNotes: [],
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.ADD_NOTE:
            return state = {
                allNotes: [...state.allNotes, action.data],
            };
        default:
            return state;
    }
}