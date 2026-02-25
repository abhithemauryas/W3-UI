/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
/* eslint-disable */
import { useState } from 'react';
import { injectIntl } from 'react-intl';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import {
  adminRoot,
  isDarkSwitchActive,
  searchPath,
} from 'constants/defaultValues';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { getDirection, setDirection } from 'helpers/Utils';
import {
  changeLocale,
  clickOnMobileMenu,
  setContainerClassnames,
} from 'redux/actions';

// import TopnavEasyAccess from './Topnav.EasyAccess';
import drakLogo from 'assets/img/auctionx-dark.png';
import logo from 'assets/img/auctionx-light.png';
import { NotificationManager } from 'components/common/react-notifications';
import { getCurrentColor } from 'helpers/Utils';
import { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { logout } from 'redux/authentication/actions.authentication';
import { useDisconnect } from 'wagmi';
import TopnavDarkSwitch from './Topnav.DarkSwitch';

const TopNav = ({
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  // locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  logoutUserAction,
  successMessage,
  // changeLocaleAction,
}) => {
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [colorDark, setColorDark] = useState(false);
  const [logowidth, setLogoWidth] = useState(180);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    let color = getCurrentColor();
    color.includes('dark') ? setColorDark(true) : setColorDark(false);
    let windowWidth = window.innerWidth;
    windowWidth < 500 && setLogoWidth(70);
  }, []);
  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword('');
  };

  // const handleChangeLocale = (_locale, direction) => {
  //   changeLocaleAction(_locale);

  //   const currentDirection = getDirection().direction;
  //   if (direction !== currentDirection) {
  //     setDirection(direction);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 500);
  //   }
  // };

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  // TODO: Search Function uncomment to use
  // const handleSearchIconClick = (e) => {
  //   if (window.innerWidth < menuHiddenBreakpoint) {
  //     let elem = e.target;
  //     if (!e.target.classList.contains('search')) {
  //       if (e.target.parentElement.classList.contains('search')) {
  //         elem = e.target.parentElement;
  //       } else if (
  //         e.target.parentElement.parentElement.classList.contains('search')
  //       ) {
  //         elem = e.target.parentElement.parentElement;
  //       }
  //     }

  //     if (elem.classList.contains('mobile-view')) {
  //       search();
  //       elem.classList.remove('mobile-view');
  //       removeEventsSearch();
  //     } else {
  //       elem.classList.add('mobile-view');
  //       addEventsSearch();
  //     }
  //   } else {
  //     search();
  //   }
  //   e.stopPropagation();
  // };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setSearchKeyword('');
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  // TODO: Search Handler
  // const addEventsSearch = () => {
  //   document.addEventListener('click', handleDocumentClickSearch, true);
  // };

  // const handleSearchInputKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     search();
  //   }
  // };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  const handleLogout = () => {
    logoutUserAction({
      cb: async () => {
        await disconnect();
        NotificationManager.success(null, 'Logout Successful!');
        localStorage.setItem('gogo_current_user', null);
        history.push('/user/login');
      },
    });
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();
    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    console.log(_containerClassnames);
    clickOnMobileMenuAction(_containerClassnames);
  };

  // const { messages } = intl;
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(!isModalOpen)}
        // backdrop={backdrop}
      >
        <ModalHeader>Confirm Logout</ModalHeader>
        <ModalBody>Are you sure you want to log out?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleLogout}>
            Confirm
          </Button>{' '}
          <Button color="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <nav className="navbar fixed-top" style={{ flexWrap: 'nowrap' }}>
        <NavLink to={adminRoot} style={{ marginLeft: '51px' }}>
          <img
            src={colorDark ? drakLogo : logo}
            alt="TBD"
            width={`${logowidth}px`}
          />
          {/* <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" /> */}
        </NavLink>

        <div className="navbar-right">
          {isDarkSwitchActive && <TopnavDarkSwitch />}
          <div className="header-icons d-inline-block align-middle">
            {/* <TopnavEasyAccess /> */}
            {/* <TopnavNotifications /> */}
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={toggleFullScreen}
            >
              {isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="user d-inline-block mr-2">
            <Link to="/app/profile-page">
              <span className="name mr-1">Super Admin</span>
              <span>
                {/* <img alt="Profile" src="/assets/img/profiles/l-1.jpg" /> */}
              </span>
            </Link>

            {/* <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
                <DropdownItem onClick={() => handleLogout()}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          </div>
          <div className="header-icons d-inline-block align-middle">
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block text-danger "
              onClick={() => setIsModalOpen(true)}
            >
              <i className="iconsminds-power-3  font-weight-bold" />
              <span className="font-weight-semibold">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = ({ menu, settings, user }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  const { successMessage } = user;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    successMessage,
  };
};
// const mapActionsToProps = (dispatch) => {
//   return {
//     setContainerClassnamesAction: dispatch(setContainerClassnames),
//     clickOnMobileMenuAction: clickOnMobileMenu,
//     // logoutUserAction: logoutUser,
//     logoutUserAction: (cb) => dispatch(logout(cb)),
//     changeLocaleAction: changeLocale,
//     // setContainerClassnamesAction: dispatch(setContainerClassnames()),
//     // clickOnMobileMenuAction: dispatch(clickOnMobileMenu()),
//     // logoutUserAction: (cb) => dispatch(logout(cb)),
//     // changeLocaleAction: dispatch(changeLocale()),
//   };
// };

export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    // logoutUserAction: logoutUser,
    logoutUserAction: (cb) => logout(cb),
    changeLocaleAction: changeLocale,
  })(TopNav)
);

// export default injectIntl(
//   connect(mapStateToProps, mapActionsToProps)(TopNav)
// );
