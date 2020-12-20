import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { stateToProps, dispatchToProps } from './maps';

import './Header.scss';

const Header = () => {
    const { activeTab, searchValue, sideBarOpen} = useSelector(stateToProps);
    const { updateSearchValue,
            updateActiveTab,
            showSideMenu,
            hideSideMenu
    } = dispatchToProps(useDispatch());

    const handleChange = (e) => {
        const searchValue = e.target.value;
        updateSearchValue(searchValue);
    }

    const renderHamburger = React.useCallback(() => (
        <svg
            className="header-hamburger"
            viewBox="0 0 100 80"
            width="32"
            height="32"
            onClick={ sideBarOpen ? hideSideMenu : showSideMenu }
        >
            <rect width="100" height="12"></rect>
            <rect y="30" width="100" height="12"></rect>
            <rect y="60" width="100" height="12"></rect>
        </svg>
    ), [sideBarOpen]);

    const renderHeaderTitle = React.useCallback(() => (
        <span className="header-title">{activeTab}</span>
    ), [activeTab]);

    const renderSearchInput = React.useCallback(() => (
        <input
            placeholder="Search"
            className='header-search'
            onChange={handleChange}
            value={searchValue}
            onBlur={() => updateSearchValue('')}
            type="search"
        />
    ), [searchValue]);

    return(
        <header className="header">
            {renderHamburger()}
            {renderHeaderTitle()}
            {renderSearchInput()}
        </header>
    );
};

export default Header;

