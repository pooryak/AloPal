import React, { useState } from 'react';
import {
    ListItem, Button, Popper, Grow,
    ClickAwayListener, Paper,
    MenuList, MenuItem, Collapse, List,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';
import style from './style';

function MultiLevel({
    data, settings, mobileView,
}) {
    const [anchorElLang, setAnchorElLang] = useState();
    const [LangMenu, setLangMenu] = useState(false);
    const router = useRouter();
    const openLangMenu = (event) => {
        setAnchorElLang(event.currentTarget);
        setLangMenu(true);
    };
    const closeLangMenu = () => {
        setLangMenu(false);
    };
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const langRouter = (language, direction) => {
        settings.lock({ language, direction });
        // settings.changeMode('dark');
        closeLangMenu();
    };
    const handleRoutes = (e, href) => {
        e.preventDefault();
        closeLangMenu();
        router.push(href);
    };
    const classes = style();
    if (mobileView) {
        return (
            <>
                <ListItem button onClick={handleClick} className={classes.mobile}>
                    <FormattedMessage id={data.title} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            data.childs.map((item) => (
                                <div onClick={(e) => handleRoutes(e, item.to)} key={item.title}>
                                    <ListItem button className={classes.mobileChild}>
                                        <FormattedMessage id={item?.title} />
                                    </ListItem>

                                </div>
                            ))
                        }
                    </List>
                </Collapse>
            </>

        );
    }
    return (
        <ListItem component="div" className={clsx(classes.root, classes.listWrapper)}>
            <div>
                <Button color="inherit" className={classes.button} endIcon={<ExpandMore />} onClick={openLangMenu}>
                    <FormattedMessage id={data?.title} />
                </Button>
                <Popper
                    anchorEl={anchorElLang}
                    open={LangMenu}
                    getContentAnchorEl={null}
                    role={undefined}
                    transition
                    disablePortal
                    style={{ zIndex: 2 }}
                >
                    {({ TransitionProps, placement = 'bottom' }) => (
                        <Grow
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...TransitionProps}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={closeLangMenu}>
                                    <MenuList
                                        id="menu-list-grow"
                                    >
                                        {
                                            data.childs.map((item) => (
                                                <div onClick={(e) => handleRoutes(e, item.to)} key={item.title}>
                                                    <MenuItem>
                                                        <FormattedMessage id={item.title} />
                                                    </MenuItem>
                                                </div>
                                            ))
                                        }

                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </ListItem>
    );
}

MultiLevel.defaultProps = {
    settings: undefined,
};

MultiLevel.propTypes = {
    data: PropTypes.object.isRequired,
    settings: PropTypes.object,
    mobileView: PropTypes.bool.isRequired,
};

export default MultiLevel;
