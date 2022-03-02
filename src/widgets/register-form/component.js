import { useEffect } from 'react';
import {
    Grid, Typography, TextField, FormControlLabel, Checkbox, Button, Divider, SvgIcon, Box,
} from '@material-ui/core';
import Link from 'next/link';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { FormattedMessage } from 'react-intl';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import style from './style';

function RegisterForm(props) {
    const classes = style();
    const { verification, errorResult } = props;
    const {
        register, handleSubmit, errors, setError,
    } = useForm();
    useEffect(() => {
        if (errorResult) {
            setError('name', {
                type: 'server',
                message: errorResult,
            });
        }
    }, [errorResult]);
    const onSubmit = async (data) => {
        if (data.name && data.emailAddress && data.terms) {
            verification(data);
        }
    };
    return (
        <Grid item xs={12} sm={6} className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Box color="aloPal.dark">
                <Typography fontSize={36} fontWeight={700}>
                    <FormattedMessage id="register.telluse" />
                </Typography>
            </Box>

            <form className={classes.form}>
                <TextField
                    inputRef={register({ required: true })}
                    id="outlined-Name"
                    label={<FormattedMessage id="name" />}
                    type="text"
                    name="name"
                    autoComplete="name"
                    variant="filled"
                    margin="dense"
                    InputProps={{
                        disableUnderline: true, // <== added this
                    }}
                />
                <ErrorMessage errors={errors} name="name" as={<p className={classes.error} />} />
                <TextField
                    inputRef={register({ required: true })}
                    id="outlined-Email"
                    label="Email Address"
                    type="email"
                    name="emailAddress"
                    autoComplete="email"
                    variant="filled"
                    margin="dense"
                    InputProps={{
                        disableUnderline: true, // <== added this
                    }}
                />
                <div className={classes.form_privacy}>
                    <FormattedMessage id="register.privacy" />
                </div>
                <FormControlLabel
                    control={(
                        <Checkbox
                            icon={<CircleUnchecked className={classes.icon} />}
                            checkedIcon={<CircleChecked className={classes.icon} />}
                        />
                    )}
                    label={(
                        <Button color="primary" type="submit" href="/terms" className={classes.conditions_btn}>
                            <FormattedMessage id="conditions" />
                        </Button>
                    )}
                    inputRef={register}
                    name="terms"
                    id="terms"
                />
                <Grid container xs={12} justifyContent="space-between" className={classes.btn_ctn}>
                    <Button variant="contained" color="secondary" type="submit">
                        <FormattedMessage id="register" />
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
}

RegisterForm.propTypes = {
    verification: PropTypes.func.isRequired,
    errorResult: PropTypes.string.isRequired,
};

export default RegisterForm;
