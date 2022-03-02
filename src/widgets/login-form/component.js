import { useState, useEffect } from 'react';
import {
    Grid, Typography, TextField, FormControlLabel,
    Checkbox, Button, Divider, SvgIcon, Box,
    InputAdornment, IconButton,
} from '@material-ui/core';
import Head from 'next/head';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Link from 'next/link';
import PropTypes from 'prop-types';
import style from './style';

function LoginForm(props) {
    const classes = style();
    const [showPassword, setShowPassword] = useState();
    const { onSubmit, errorResult } = props;
    const {
        register, handleSubmit, errors, setError, getValues,
    } = useForm();
    useEffect(() => {
        if (errorResult) {
            setError('email', {
                type: 'server',
                message: errorResult,
            });
        }
    }, [errorResult]);
    const passwordValue = getValues('password');
    function handleClickShowPassword() {
        setShowPassword((prevState) => !prevState);
    }
    function handleMouseDownPassword(event) {
        event.preventDefault();
    }
    return (
        <Grid item xs={12} sm={6} className={classes.root}>
            <Head>
                <title>Login</title>
            </Head>
            <Typography variant="h3" color="aloPal.dark" fontWeight={700}>
                <FormattedMessage id="login.welcome" />
            </Typography>
            <form data-testid="form" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    inputRef={register({ required: true })}
                    id="outlined-Email"
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    variant="filled"
                    margin="dense"
                    InputProps={{
                        disableUnderline: true, // <== added this
                    }}
                />
                <ErrorMessage errors={errors} name="email" as={<p className="error" />} />
                <TextField
                    inputRef={register({ required: true })}
                    id="outlined-Password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    variant="filled"
                    margin="dense"
                    InputProps={{
                        disableUnderline: true, // <== added this
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}

                />
                <Box display="flex" justifyContent="space-between" mt={5}>
                    <FormControlLabel
                        control={(
                            <Checkbox
                                icon={<CircleUnchecked className={classes.icon} />}
                                checkedIcon={<CircleChecked className={classes.icon} />}
                            />
                        )}
                        label={<FormattedMessage id="remember" />}
                        inputRef={register}
                        name="remember_me"
                        id="remember me"
                        className={classes.remeber_btn}
                    />
                    <Button color="primary" type="submit" className={classes.forget_btn}>
                        <FormattedMessage id="login.forgot" />
                    </Button>
                </Box>
                {/* <ErrorMessage errors={errors} name="email" as={<p className={classes.error} />} /> */}

                <Grid item xs={12} justifyContent="center" className={classes.btn_ctn}>
                    <Button variant="contained" color="secondary" type="submit" className={classes.login}>
                        <FormattedMessage id="login" />
                    </Button>

                </Grid>
            </form>
            <Grid constainer xs={12} className={classes.divider}>
                <Grid container xs={5} justifyContent="center" className={classes.divider_itm}>
                    <Divider variant="middle" />

                </Grid>
                <Grid container xs={2} justifyContent="center" className={classes.divider_itm}>
                    <Box fontSize={36}>
                        <FormattedMessage id="common.or" />
                    </Box>
                </Grid>
                <Grid item xs={5} justifyContent="center" className={classes.divider_itm}>
                    <Divider variant="middle" />
                </Grid>
            </Grid>
            <Grid xs={12} className={classes.btn_container}>
                <Button
                    variant="contained"
                    type="submit"
                    className={classes.btn_fb}
                    startIcon={<FacebookIcon className={classes.icon_fb} />}
                >
                    <FormattedMessage id="login.continue_facebook" />
                </Button>
                <Button
                    variant="contained"
                    color="white"
                    type="submit"
                    className={classes.btn_google}
                    startIcon={(
                        <SvgIcon className={classes.icon_google}>
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
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.footer_txt}>
                    <Typography variant="h6">
                        <FormattedMessage id="login.have_an_account" />
                    </Typography>
                </Box>
                <Grid justify="center" align="center">
                    <Link href="/register">
                        <Button variant="outlined" className={classes.footer_btn}>
                            <FormattedMessage id="login.register_account" />
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errorResult: PropTypes.string,
};

LoginForm.defaultProps = {
    errorResult: null,
};

export default LoginForm;
