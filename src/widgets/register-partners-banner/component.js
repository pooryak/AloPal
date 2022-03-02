import React from 'react';
import { Grid } from '@material-ui/core';
import Image from 'next/image';
import PropTypes from 'prop-types';
import style from './style';

function RegisterPartnersBanner(props) {
    const classes = style();
    return (
        <Grid item xs={12} sm={6} className={classes.root}>
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

RegisterPartnersBanner.propTypes = {

};

export default RegisterPartnersBanner;
