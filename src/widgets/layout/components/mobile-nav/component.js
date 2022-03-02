import { useState, useEffect } from 'react';
import {
    IconButton, Drawer,
    MenuItem,
    Menu,
} from '@material-ui/core';
import { useToken } from 'src/utility/hooks';
import { Menu as MenuIcon } from '@material-ui/icons';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useAuth } from 'src/utility/contexts/auth';
import PropTypes from 'prop-types';
import { SessionMenu, SideDrawer, MultiLevel } from '..';

import style from './style.js';

const sessions = [{
    title: 'Eget dolor morbi no arcu',
    description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
    dr: 'Mr. John Smith',
    role: 'Psychiatrists',
    pic: '/assets/image/insert.svg',
}, {
    title: 'Eget dolor morbi no arcu',
    description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
    dr: 'Mr. John Smith',
    role: 'Psychiatrists',
    pic: '/assets/image/insert.svg',
}];
const userMenu = [
    {
        title: 'layout.aside.dashboard',
        childs: [
            {
                title: 'layout.aside.dashboard',
                to: '/user-dashboard',
            }, {
                title: 'layout.aside.sessions',
                to: '/user-dashboard/sessions-and-courses',
            }, {
                title: 'layout.aside.wallet',
                to: '/user-dashboard/wallet',
            }, {
                title: 'layout.aside.messages',
                to: '/user-dashboard/messages',
            }, {
                title: 'layout.aside.settings',
                to: '/user-dashboard/settings',
            },
        ],
    },

];
function MobileNav({
    navDetail, localInfo, leftNav, rightNav,
}) {
    const classes = style();
    const [token, setToken] = useState(false);
    const auth = useAuth();
    const tokenStatus = useToken();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const isMenuOpen = Boolean(anchorEl);
    const handleSignOut = () => {
        auth.signout();
        handleMobileMenuClose();
    };
    const [state, setState] = useState({ right: false });
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ [anchor]: open });
    };
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link href="/login">
                    <a>
                        <FormattedMessage id="login" />
                    </a>
                </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Link href="/register">
                    <a>
                        <FormattedMessage id="register" />
                    </a>
                </Link>
            </MenuItem>
        </Menu>
    );
    return (
        <>
            <IconButton edge="end" aria-label="menu" onClick={toggleDrawer('right', true)}>
                <MenuIcon />
            </IconButton>

            {
                tokenStatus.token?.is_login ? (
                    <SessionMenu
                        lang={localInfo}
                        data={rightNav}
                        sessions={sessions}
                        signOut={handleSignOut}
                    />
                ) : (
                    <>
                        <MultiLevel
                            data={rightNav}
                        />
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </>
                )
            }

            <Drawer
                anchor="right"
                open={state.right}
                onOpen={toggleDrawer('right', true)}
                onClose={toggleDrawer('right', false)}
            >
                <SideDrawer navDetail={navDetail} leftNav={leftNav} userMenu={userMenu} />
            </Drawer>
            {renderMenu}
        </>
    );
}

MobileNav.propTypes = {
    navDetail: PropTypes.array.isRequired,
    leftNav: PropTypes.array.isRequired,
    localInfo: PropTypes.object.isRequired,
};

export default MobileNav;
