import React, { useEffect, useMemo, useRef, useState } from "react";
import webIcon from "../../../public/assets/pics/webIcon.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import logout from "../../utilities/user/logout";
import useAppContext from "../../contexts/App/useAppContext";
import userRoutes from "../../routers/userRoutes";
import adminRoutes from "../../routers/adminRouters";

const mountWith = {
	navWrapper: 900,
};

const NavMenu = ({ userRole }) => {
	const userMenuItems = useMemo(() => {
		return userRoutes
			.filter((page) => page.name)
			.map((item, index) => (
				<li key={index}>
					<Link to={`/${item.path}`}>
						{item.name}
					</Link>
				</li>
			));
	}, []);

	const adminMenuItems = useMemo(() => {
		return userRole === "admin"
			? adminRoutes.map((item, index) => (
					<li key={index}>
						<Link to={`/${item.path}`}>
							{item.name}
						</Link>
					</li>
			  ))
			: [];
	}, [userRole]);

	return (
		<ul>
			{userMenuItems}
			{adminMenuItems}
		</ul>
	);
};

function Header({ ...rest }) {
	const { appContext, userRole } = useAppContext();
	const [isShowUserWrapper, setIsShowUserWrapper] = useState(false);
	const [isShowNavWrapper, setIsShowNavWrapper] = useState(false);
	const userIconRef = useRef(),
		userWrapperRef = useRef(),
		navIconRef = useRef(),
		navWrapperRef = useRef();

	const handleShowUserWrapper = () => {
		setIsShowUserWrapper(!isShowUserWrapper);
	};

	const handleShowNavWrapper = () => {
		setIsShowNavWrapper(!isShowNavWrapper);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				userIconRef.current &&
				!userIconRef.current.contains(event.target) &&
				userWrapperRef.current &&
				!userWrapperRef.current.contains(event.target)
			) {
				setIsShowUserWrapper(false);
			}
			if (
				navIconRef.current &&
				!navIconRef.current.contains(event.target) &&
				navWrapperRef.current &&
				!navWrapperRef.current.contains(event.target)
			) {
				setIsShowNavWrapper(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header {...rest}>
			<div className="webHeader-left">
				<div className="webHeader-left__icon">
					<img src={webIcon} alt="webIcon" />
				</div>
				<div className="webHeader-left__title">Web Development</div>
			</div>
			<div className="webHeader-right">
				<div className="webHeader-right__nav">
					<NavMenu userRole = {userRole}/>
				</div>
				{appContext.screenW <= mountWith.navWrapper ? (
					<div className="webHeader-right__nav--wrapper">
						<div className="webHeader-right__nav-icon" ref={navIconRef} onClick={handleShowNavWrapper}>
							<FontAwesomeIcon icon={faBars} />
						</div>
						{isShowNavWrapper && (
							<div className="wrapper webHeader-right__nav-wrapper" ref={navWrapperRef}>
								<NavMenu />
							</div>
						)}
					</div>
				) : null}
				<div className="webHeader-right__user">
					<div className="webHeader-right__user-icon" ref={userIconRef} onClick={handleShowUserWrapper}>
						<FontAwesomeIcon icon={faUser} />
					</div>
					{isShowUserWrapper && (
						<div className="wrapper webHeader-right__user-wrapper" ref={userWrapperRef}>
							<ul>
								<li>
									<button onClick={() => logout()}>đăng xuất</button>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

export default React.memo(Header);
