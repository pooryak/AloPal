import React from 'react';
import { Grid } from '@material-ui/core';
import Image from 'next/image';
import PropTypes from 'prop-types';
import style from './style';

function ProfileBanner(props) {
    const classes = style();
    return (
        <Grid item className={classes.root}>
            <div className={classes.img_ctn}>
                <Image
                    src="/assets/image/login.jpg"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
        </Grid>
    );
}

ProfileBanner.propTypes = {

};

export default ProfileBanner;
