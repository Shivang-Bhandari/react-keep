import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { stateToProps, dispatchToProps } from './maps';

import './SideBar.scss';

const WIDTH = '240';

/**
 * Component to show sidebar on homepage with available tabs
 * @component
 * @example
 * <SideBar/>
 */
const SideBar = () => {
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
		if (sideBarOpen) {
			setX(0);
		} else {
			setX(-WIDTH);
		}

		return (() => {
			setX(-WIDTH);
		})
	}, [sideBarOpen]);

	return (
		<>
			<div
				className="sidebar"
				style={{
					transform: `translateX(${xPosition}px)`,
					width: `${WIDTH}px`,
				}}
			>
				<span
					className="sidebar-item"
					onClick={() => { handleChange('notes') }}
				>
					NOTES
                </span>
				<span
					className="sidebar-item"
					onClick={() => { handleChange('archived') }}
				>
					ARCHIVED
                </span>
			</div>
			{ sideBarOpen && <div className="sidebar-overlay" onClick={hideSideMenu} />}
		</>
	)
};

export default SideBar;
