import React from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import dummy from 'public/assets/image/avatar4.55833b54.svg';
import style from './style.js';

function Avatars(props) {
    const classes = style();

    return (
        <Grid justifyContent="center" align="center" className={classes.root}>
            <Avatar className={classes.img} src={dummy.src} />
            <Typography variant="subtitle1">
                Sonia Kamalian
            </Typography>
            <Typography variant="subtitle2">
                Psychiatrists
            </Typography>
        </Grid>
    );
}

Avatars.propTypes = {

};

export default Avatars;
