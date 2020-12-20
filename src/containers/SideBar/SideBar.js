import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { stateToProps, dispatchToProps } from './maps';

import './SideBar.scss';

const WIDTH = '240';

const SideBar = ({ children }) => {
    const { sideBarOpen } = useSelector(stateToProps);
    const {
        updateActiveTab,
        hideSideMenu,
    } = dispatchToProps(useDispatch());
    const [xPosition, setX] = React.useState(-WIDTH);

    const handleChange = (value) => {
        updateActiveTab(value);
    }

    React.useEffect(() => {
        if(sideBarOpen) {
            setX(0);
        } else {
            setX(-WIDTH);
        }

        return(() => {
            setX(-WIDTH);
        })
    }, [sideBarOpen]);

    console.log("🚀 ~ file: SideBar.js ~ line 17 ~ SideBar ~ xPosition", xPosition)

    return(
        <div
            className="sidebar"
            style={{
                transform: `translateX(${xPosition}px)`,
                width: `${WIDTH}px`,
            }}
        >
            <span onClick={() => {handleChange('notes')}}>NOTES</span>
            <span onClick={() => {handleChange('archives')}}>ARCHIVES</span>
        </div>
    )
};

export default SideBar;
