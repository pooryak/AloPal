import React from 'react';
import {
    List, ListItem, ListItemText, Typography, Box,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import style from './style';
import { MultiLevel } from '..';

function LeftMenu({ navDetail, leftNav }) {
    const classes = style();
    const NavItems = navDetail.map((item) => (
        <ListItem component="div" className={clsx(classes.root, classes.listWrapper)} key={item.text}>
            <Link href={item.to}>
                <div className={classes.regularBut}>
                    <ListItemText>
                        <Typography color="inherit" variant="title">
                            <FormattedMessage id={item.text} />
                        </Typography>
                    </ListItemText>
                </div>
            </Link>
        </ListItem>
    ));
    return (
        <List component="nav" className={classes.navDisplayFlex}>
            <Box display="flex" className={classes.nav_logo}>
                <Link href="/">
                    <Image src="/assets/image/Logofinal.png" layout="fill" />
                </Link>
            </Box>
            {leftNav.map((item) => <MultiLevel data={item} key={item.title} />)}
            {NavItems}
        </List>
    );
}

LeftMenu.propTypes = {
    navDetail: PropTypes.array.isRequired,
    leftNav: PropTypes.array.isRequired,
};

export default LeftMenu;
