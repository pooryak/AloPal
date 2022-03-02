import React from 'react';
import {
    Grid, Typography, TextField, FormControlLabel, Checkbox, Button, Divider, SvgIcon, Box,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import style from './style';

function RegisterPartnersForm(props) {
    const classes = style();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (data) => {
        console.log(data, 'data');
    };
    return (
        <Grid item xs={12} sm={6} className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h3">
                <FormattedMessage id="login.welcome.pal" />
            </Typography>
            <form className={classes.form}>
                <TextField
                    inputRef={register({ required: true })}
                    id="outlined-Email"
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                />
                <TextField
                    inputRef={register({ required: true })}
                    id="outlined-Password"
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={<FormattedMessage id="remember" />}
                    inputRef={register}
                    name="remember me"
                    id="remember me"
                />
                <Grid container xs={12} justifyContent="space-between" className={classes.btn_ctn}>
                    <Button variant="contained" color="primary" type="submit">
                        <FormattedMessage id="login" />
                    </Button>
                    <Button variant="outlined" color="primary">
                        <FormattedMessage id="login.forgot" />
                    </Button>
                </Grid>
            </form>
            <Grid constainer xs={12} className={classes.divider}>
                <Grid item xs={4} justifyContent="center" className={classes.divider_itm}>
                    <Divider flexItem variant="middle" />

                </Grid>
                <Grid item xs={4} justifyContent="center" className={classes.divider_itm}>
                    <FormattedMessage id="common.or" />
                </Grid>
                <Grid item xs={4} justifyContent="center" className={classes.divider_itm}>
                    <Divider flexItem variant="middle" />
                </Grid>
            </Grid>
            <Grid xs={12} className={classes.btn_container}>
                <Button variant="contained" color="primary" type="submit" startIcon={<FacebookIcon />}>
                    <FormattedMessage id="login.continue_facebook" />
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={(
                        <SvgIcon>
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>Google icon</title>
                                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                            </svg>
                        </SvgIcon>
                    )}
                >
                    <FormattedMessage id="login.continue_google" />
                </Button>
            </Grid>
            <Grid xs={12} spacing={2}>
                <Divider />
            </Grid>
            <Grid xs={12} spacing={2}>
                <Box className={classes.footer_txt}>
                    <Typography variant="h6">
                        <FormattedMessage id="login.have_an_account" />
                    </Typography>
                </Box>
                <Grid justify="center" align="center">
                    <Button variant="contained" color="secondary" className={classes.footer_btn}>
                        <FormattedMessage id="login.register_account" />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

RegisterPartnersForm.propTypes = {

};

export default RegisterPartnersForm;
