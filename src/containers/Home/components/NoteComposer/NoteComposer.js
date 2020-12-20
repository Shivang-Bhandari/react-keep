import React from 'react';

import { autoResize } from './utils';
import { PIN_SVG_URL } from './const.js'

import './NoteComposer.scss';


const NoteComposer = ({ addNote }) => {
    const [titleFieldVisible, setTitleFieldVisible] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [noteValue, setNoteValue] = React.useState('');
    const [isHovered, setIsHovered] = React.useState(true);

    const renderMenuItems = () => {
        return (<div
            className="menu-item-pin"
            style={{
                backgroundImage: PIN_SVG_URL
            }}
        />);
    };

    React.useEffect(() => {
        document.addEventListener('input', event => {
            if(event.target.tagName.toLowerCase() !== 'textarea') return;
            autoResize(event.target);
        }, false);
        
    }, [])
    
    const showTitleField = () => {
        setTitleFieldVisible(true)
    }


    const hideTitleField = () => {
        if(!value.length)
            setTitleFieldVisible(false)
    }

    const handleSubmit = (e) => {
        console.log(value, noteValue);
        e.preventDefault();
        const noteData = {
            id: Math.random()
                .toString(36)
                .substring(7),
            title: value,
            description: noteValue,
            pinned: false,
            archived: false,
        };

        console.log(noteData);
        addNote(noteData);
        setValue('');
        setNoteValue('')
        setTitleFieldVisible(false);
    }

    return(
        <div className="note-composer"
            onMouseEnter={() => { setIsHovered(true) }}
            onMouseLeave={() => { setIsHovered(true) }}
        >
            {isHovered && renderMenuItems()}

            {titleFieldVisible && (
                <div className="note-composer-overlay" onClick={hideTitleField} />
            )}
            <form className="note-composer-form" onSubmit={handleSubmit}>
                {
                    titleFieldVisible && (
                        <div className="note-composer-title-wrapper">
                            <input
                                onFocus={showTitleField}
                                className="note-composer-title"
                                value={value}
                                onChange={(e) => {setValue(e.target.value)}}
                                placeholder="Title"
                            />
                        </div>
                    )
                }
                <textarea
                    className="note-composer-textarea"
                    value={noteValue}
                    onChange={e => setNoteValue(e.target.value)}
                    onFocus={showTitleField}
                    name="content"
                    placeholder="Take a note..."
                />
                <button type="Submit">
                    <span>&#43;</span>
                </button>
            </form>
        </div>
    )
};

export default NoteComposer;