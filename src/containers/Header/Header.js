import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stateToProps, dispatchToProps } from './maps';

import './Header.scss';

/**
 * Component to show sidebar on homepage with available tabs
 * @component
 * @example
 * <Header/>
 */
const Header = () => {
    const { activeTab, searchValue, sideBarOpen} = useSelector(stateToProps);
    const { updateSearchValue,
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
        <span className="header-title">{activeTab.toUpperCase()}</span>
    ), [activeTab]);

    const renderSearchInput = React.useCallback(() => (
        <input
            placeholder="Search"
            className='header-search'
            onChange={handleChange}
            value={searchValue}
            onBlur={() => updateSearchValue('')}
        />
    ), [searchValue]);

    const renderCrossIcon = React.useCallback(() => (
        <svg onClick={() => {updateSearchValue('')}} width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path
                    d="M12.59,6 L10,8.59 L7.41,6 L6,7.41 L8.59,10 L6,12.59 L7.41,14 L10,11.41 L12.59,14 L14,12.59 L11.41,10 L14,7.41 L12.59,6 Z M10,0 C4.47,0 0,4.47 0,10 C0,15.53 4.47,20 10,20 C15.53,20 20,15.53 20,10 C20,4.47 15.53,0 10,0 Z M10,18 C5.59,18 2,14.41 2,10 C2,5.59 5.59,2 10,2 C14.41,2 18,5.59 18,10 C18,14.41 14.41,18 10,18 Z"
                    id="Shape"
                    fill="#666666"
                />
            </g>
        </svg>
    ))

    return(
        <header className="header">
            {renderHamburger()}
            {renderHeaderTitle()}
            <div className="header-search-wrapper">
                {renderSearchInput()}
                {searchValue.length > 0 && renderCrossIcon()}
            </div>
        </header>
    );
};

export default Header;

