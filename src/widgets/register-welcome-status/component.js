import React from 'react';
import {
    Grid, Typography, TextField, FormControlLabel, Checkbox, Button, Divider, SvgIcon, Box,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import Image from 'next/image';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Link from 'next/link';
import PropTypes from 'prop-types';
import style from './style';

function WelcomeStatus(props) {
    const classes = style();
    return (
        <Grid item xs={12} sm={6} className={classes.root}>
            <div className={classes.img_ctn}>
                <MailOutlineIcon className={classes.icon} />
            </div>
            <Box fontWeight={500} mb={4} className={classes.welcome_title}>
                <Typography variant="h4" fontWeight={700}>
                    <FormattedMessage id="register.welcome" />
                    <span>!</span>
                </Typography>
            </Box>
            <Box fontWeight={500} mb={2} className={classes.welcome_title}>
                <Typography variant="h5" fontWeight={700}>
                    <FormattedMessage id="register.check" values={{ breakingLine: <br /> }} />
                </Typography>
            </Box>
            <Box fontWeight={500} lineHeight={1.7} mb={2}>
                <Typography variant="p" fontFamily="Roboto" fontSize={14} fontWeight={400} className={classes.description}>
                    <FormattedMessage
                        id="register.description"
                        values={{
                            breakingLine: <br />,
                        }}
                    />
                </Typography>
            </Box>
        </Grid>
    );
}

WelcomeStatus.propTypes = {

};

export default WelcomeStatus;
