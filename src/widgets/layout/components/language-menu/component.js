import { useContext, useState } from 'react';
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
import Joyride, { STATUS } from 'react-joyride';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import languages from 'src/locales';
import Link from 'next/link';
import { UserContext } from '../../../../components';
import style from './style';

function MultiLevel({
    data, settings, mobileView,
}) {
    const localInfo = useContext(UserContext);
    const [anchorElLang, setAnchorElLang] = useState();
    const [LangMenu, setLangMenu] = useState(false);
    const introCookie = Cookies.getJSON('introTc');
    const [run, setRun] = useState(!introCookie?.intro);
    const router = useRouter();
    const openLangMenu = (event) => {
        setAnchorElLang(event.currentTarget);
        setLangMenu(true);
    };

    const closeLangMenu = () => {
        setLangMenu(false);
    };

    function userIntro() {
        const result = Cookies.getJSON('introTc');
        if (!result) {
            Cookies.set('introTc',
                { intro: true }, { expires: 700 });
        }
    }

    // if (!introCookie?.intro) {
    //     userIntro();
    // }
    const steps = [
        {
            content: <FormattedMessage id="general.select_language" />,
            target: '.lgbtn span',
            locale: { last: <strong aria-label="skip"><FormattedMessage id="general.ok" /></strong> },
            placement: 'top',
        //     floaterProps: {
        //         disableAnimation: true,
        //     },
        //     spotlightPadding: 20,
        },
    ];
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

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
        if (finishedStatuses.includes(status)) {
            userIntro();
            setRun(false);
        }
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

                            settings ? data.childs.map((item) => (
                                <MenuItem
                                    key={item.title}
                                    onClick={(e) => langRouter(item.lang, item.direction)}

                                >
                                    {item.title}
                                </MenuItem>
                            ))
                                : data.childs.map((item) => (
                                    <div onClick={(e) => handleRoutes(e, item.to)} key={item.title}>
                                        <ListItem button className={classes.mobileChild}>
                                            <FormattedMessage id={item.title} />
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
                <Joyride
                    callback={handleJoyrideCallback}
                    // getHelpers={this.getHelpers}
                    run={run}
                    scrollToFirstStep
                    showSkipButton
                    steps={steps}
                    styles={{
                        options: {
                            zIndex: 10000,
                        },
                    }}
                />
                <Button color="inherit" className={clsx(classes.button, 'lgbtn')} endIcon={<ExpandMore />} onClick={openLangMenu}>
                    <FormattedMessage id={localInfo.language.toUpperCase()} />
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
                                        { languages.map((item) => (
                                            <MenuItem
                                                key={item.title}
                                                onClick={(e) => langRouter(item.language, item.direction)}
                                            >
                                                {item.language.toUpperCase()}
                                            </MenuItem>
                                        ))}

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
