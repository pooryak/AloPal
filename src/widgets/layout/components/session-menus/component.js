import { useState } from 'react';
import {
    Box, useMediaQuery, CardMedia, Grid,
    Typography, Menu, MenuItem, IconButton, Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import style from './style';

import { MultiLevel, LanguageMenu } from '..';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        backgroundColor: '#fff',
        width: '400px',
        padding: '10px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'unset',
        top: 63,
        '&::after': {
            content: '" "',
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: '10px solid #fff',
            top: -10,
            right: 10,
        },
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        PaperProps={{
            style: {
                top: '63px !important',
            },
        }}
        {...props}
    />
));

function SessionMenu(props) {
    const {
        settings, data, sessions, signOut, authType,
    } = props;
    const classes = style();
    const [anchorSessionEl, setAnchorSessionEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick = (event) => {
        setAnchorSessionEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorSessionEl(null);
    };
    return (
        <>
            <Button
                className={classes.expanded}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="outlined"
                //
                onClick={handleClick}
                endIcon={<ExpandMoreIcon />}
            >
                {
                    matches ? <FormattedMessage id="general.my_courses" /> : <FormattedMessage id="general.sessions" />
                }
            </Button>
            <StyledMenu
                className={classes.menu}
                id="customized-menu"
                anchorEl={anchorSessionEl}
                keepMounted
                open={Boolean(anchorSessionEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                // {...props}
            >
                {
                    sessions.length > 0 ? (
                        <Box
                            display="flex"
                            flexDirection="column"
                            className={classes.container}
                        >
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <div className={classes.popTitle}>
                                    <Box fontWeight={700} fontSize={16} color="aloPal.dark">
                                        <FormattedMessage id="general.no_session" values={{ value: <span className={classes.and}>&</span> }} />
                                    </Box>
                                    <Box fontWeight={400} fontSize="14px" className={classes.items}>
                                        {sessions.length + 1}
                                        {' '}
                                        items
                                    </Box>
                                </div>
                            </Box>
                            <Grid className={classes.cardContainer}>
                                {
                                    sessions.map((item, index) => (
                                        <div className={classes.card} key={`${item.title}-${index}`}>
                                            <CardMedia
                                                className={classes.cover}
                                                image={item.pic}
                                                title="Live from space album cover"
                                            />
                                            <div className={classes.details}>
                                                <Box fontSize="16px" fontWeight={600} color="aloPal.dark">
                                                    {item.title}
                                                </Box>
                                                <Box fontSize={12} fontWeight={400} className={classes.description}>
                                                    {item.description}
                                                </Box>
                                                <Box fontSize="14px" color="aloPal.dark" fontWeight={500} marginTop={1}>
                                                    {item.dr}
                                                </Box>
                                                <Box fontSize={12} className={classes.description}>
                                                    {item.role}
                                                </Box>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Grid>
                        </Box>
                    ) : (
                        <>
                            <Box fontWeight={700} color="aloPal.dark">
                                <FormattedMessage id="general.no_session" values={{ value: <span className={classes.and}>&</span> }} />
                            </Box>
                            <Box fontSize={14} fontWeight={400} marginTop={1}>
                                Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                            </Box>
                            <Box marginTop={5}>
                                <Button variant="outlined" className={classes.all_session_btn}>
                                    <FormattedMessage id="general.view_all_session" />
                                </Button>
                            </Box>

                        </>
                    )
                }

            </StyledMenu>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="secondary"
            >
                <PersonOutlineIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id="primary-search-account-menu"
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <Link href={`/dashboards/${authType}`}>
                    <MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
                </Link>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </Menu>
            <LanguageMenu settings={settings} />

        </>
    );
}

SessionMenu.propTypes = {
    settings: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    sessions: PropTypes.array.isRequired,
    signOut: PropTypes.func.isRequired,
    authType: PropTypes.string.isRequired,
};

export default SessionMenu;
