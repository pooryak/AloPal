import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { MobileNav, RoutesButtons, UserMenu } from '..';
import { UserContext } from '../../../../components';
import style from './style';

const navDetail = [
    {
        text: 'navBar.faq',
        to: '/faq',
    },
    {
        text: 'navBar.contact',
        to: '/contact',
    },
    {
        text: 'navBar.work_with_us',
        to: '/partners/login',
    },

];

const servicesRoutes = [{
    title: 'navBar.services',
    childs: [{ title: 'filters.options.Psychotherapy', to: '/services/psychotherapy' },
        { title: 'medical.title', to: '/services/medical-consultants' },
        { title: 'tutors.title', to: '/services/tutors' }],
},
{
    title: 'navBar.who?',
    childs: [{ title: 'About.title', to: '/about' },
        { title: 'listpsychoterapist.title', to: '/lists/psychoterapists' },
        { title: 'listspecialists.title', to: '/lists/specialitst' },
        { title: 'listtutors.title', to: '/lists/tutors' }],
}];

function NavBar(props) {
    const localInfo = useContext(UserContext);
    const classes = style();
    const rightNav = {
        title: localInfo.language.toUpperCase(),
        childs: [{ title: 'FA', lang: 'fa', direction: 'rtl' },
            { title: 'EN', lang: 'en', direction: 'ltr' }],
    };
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <AppBar position="static" className={classes.root}>
            <Container max-width="lg">
                <Toolbar className={classes.toolbarFlex}>
                    {
                        matches ? null : (
                            <>
                                <RoutesButtons navDetail={navDetail} leftNav={servicesRoutes} />
                                <UserMenu localInfo={localInfo} />
                            </>
                        )
                    }
                    {
                        matchesMd ? null : (
                            <MobileNav
                                navDetail={navDetail}
                                leftNav={servicesRoutes}
                                localInfo={localInfo}
                                rightNav={rightNav}
                            />
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
