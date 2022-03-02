import {
    List, ListItem, ListItemText,
    Typography,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import { useAuth } from 'src/utility/contexts/auth';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useToken, useSettings } from 'src/utility/hooks';
import { useRouter } from 'next/router';
import style from './style';
import { SessionMenu, LanguageMenu } from '..';

function RightMenu({ localInfo, rightNav }) {
    const classes = style();
    const auth = useAuth();
    const router = useRouter();
    const tokenStatus = useToken();
    const handleSignOut = () => {
        auth.signout().then(() => { tokenStatus.getToken(); router.push('/'); });
    };

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
    },
    {
        title: 'Eget dolor morbi no arcu',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        dr: 'Mr. John Smith',
        role: 'Psychiatrists',
        pic: '/assets/image/insert.svg',
    },
    {
        title: 'Eget dolor morbi no arcu',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        dr: 'Mr. John Smith',
        role: 'Psychiatrists',
        pic: '/assets/image/insert.svg',
    }];
    return (
        tokenStatus.token?.is_login ? (
            <List component="nav" className={classes.navDisplayFlex}>
                <SessionMenu
                    settings={localInfo}
                    data={rightNav}
                    authType={tokenStatus.token.userType}
                    sessions={sessions}
                    signOut={handleSignOut}
                />
            </List>
        ) : (
            <List component="nav" className={classes.navDisplayFlex}>
                <Link href="/login">
                    <div className={classes.aTag}>
                        <ListItem selected={router.pathname === '/login'} component="div" className={clsx(classes.root, classes.listWrapper)}>
                            <ListItemText>
                                <Typography color="inherit" variant="title">
                                    <FormattedMessage id="navBar.login" />
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </div>
                </Link>
                <Link href="/register">
                    <div className={classes.aTag}>
                        <ListItem selected={router.pathname === '/register'} component="div" className={clsx(classes.root, classes.listWrapper)}>
                            <ListItemText>
                                <Typography color="inherit" variant="title">
                                    <FormattedMessage id="navBar.register" />
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </div>
                </Link>
                <LanguageMenu settings={localInfo} />
            </List>
        )
    );
}

RightMenu.propTypes = {
    localInfo: PropTypes.object.isRequired,
    rightNav: PropTypes.object.isRequired,
};

export default RightMenu;
