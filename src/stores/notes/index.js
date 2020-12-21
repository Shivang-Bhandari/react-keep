import * as types from './actionTypes';


const initialState = {
    allNotes: JSON.parse(localStorage.getItem('allNotes')) || [
        {id: "yquepd1", title: "lol title 1", description: "wow 2134", pinned: false, archived: false},
        {id: "yquepd2", title: "lol title 2", description: "asdawow 2134sd", pinned: false, archived: false},
        {id: "yquepd3", title: "lol title 3", description: "wow 2134", pinned: false, archived: false},
        {id: "yquepd4", title: "lol title 4", description: "wow 2134", pinned: true, archived: false},
        {id: "yquepd5", title: "pinned archived", description: "wow 2134", pinned: true, archived: true},
        {id: "yquepd6", title: "lol title 4", description: "wow 2134", pinned: false, archived: true},
        {id: "yquepd7", title: "lol title 4", description: "wow 2134", pinned: false, archived: true},
    ],
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.ADD_NOTE:
            localStorage.setItem('allNotes', JSON.stringify([...state.allNotes, action.data]));
            return state = {
                allNotes: [...state.allNotes, action.data],
            };
            
        default:
            return state;
    }
}