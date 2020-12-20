import React from 'react';

import EditIcon from './EditIcon';

import './Note.scss';


const Note = ({ title, description, index }) => {
    return (
        <div index={index} className="note">
            {/* <div
            >
                <EditIcon />
            </div> */}

            {title &&
                <h1 className="note-title">{title}</h1>
            }
            {description &&
                <div className="note-description">{description}</div>
            }
        </div>
    )
}

export default Note;