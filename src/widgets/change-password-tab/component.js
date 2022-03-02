import {
    Box, TextField, Button, InputAdornment, IconButton,
} from '@material-ui/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from 'react-query';
import decoder from 'compiled';
import { useToken } from 'src/utility/hooks';
import { ApiUserPasswordUpdateRepository } from 'repository';
import style from './style';

function ChangePasswordTab(props) {
    const [showPassword, setShowPassword] = useState();
    const classes = style();
    const tokenStatus = useToken();
    const {
        register, handleSubmit, errors, setError, clearErrors,
    } = useForm();
    const registerNewPassword = useMutation((user) => ApiUserPasswordUpdateRepository.apiUserPasswordUpdatePost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.UpdatePasswordResponse.decode(apiData.data);
            console.log('🚀 ~ file: component.js ~ line 32 ~ registerNewPassword ~ decodedData', decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            setError('oldPassword', {
                type: 'server',
                message: errResponse.responseContext.status.message,
            });
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });
    const prepData = async (data) => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        };
        const verify = decoder.alopal.backend.UpdatePasswordRequest.create(dataWithContext);
        console.log('🚀 ~ file: component.js ~ line 46 ~ prepData ~ verify', verify);
        const encodedData = decoder.alopal.backend.UpdatePasswordRequest.encode(verify).finish();
        const datacv = await registerNewPassword.mutateAsync(encodedData);
    };
    const callSubmit = (value) => {
        console.log('🚀 ~ file: component.js ~ line 46 ~ callSubmit ~ value', value);
        // clearErrors('newPassword');
        console.log(value.newPassword.length, 'value.newPassword.length');
        if (value.newPassword.length < 8) {
            return setError('newPassword', {
                type: 'server',
                message: <FormattedMessage id="errors.length" />,
            });
        }
        if (value.newPassword !== value.retypePass) {
            return setError('retypePass', {
                type: 'server',
                message: <FormattedMessage id="errors.notEqualPass" />,
            });
        }
        clearErrors(['newPassword', 'retypePass', 'oldPassword']);
        return prepData(value);
    };
    function handleClickShowPassword() {
        setShowPassword((prevState) => !prevState);
    }
    function handleMouseDownPassword(event) {
        event.preventDefault();
    }
    return (
        <form className={classes.form} onSubmit={handleSubmit(callSubmit)}>
            <Box marginBottom={3}>
                <TextField
                    id="current-outlined-password"
                    inputRef={register({ required: true })}
                    label={<FormattedMessage id="form.currentpassword" />}
                    type="password"
                    name="oldPassword"
                    autoComplete="current-password"
                    variant="filled"
                    margin="dense"
                    InputProps={{
                        disableUnderline: true,
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
                    required
                />
                <ErrorMessage errors={errors} name="oldPassword" as={<p className="error" />} />
            </Box>
            <TextField
                inputRef={register({ required: true })}
                id="outlined-password"
                label={<FormattedMessage id="form.newpassword" />}
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                variant="filled"
                margin="dense"
                InputProps={{
                    disableUnderline: true,
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
                required
            />
            <ErrorMessage errors={errors} name="newPassword" as={<p className="error" />} />
            <TextField
                inputRef={register({ required: true })}
                id="outlined-password-re"
                label={<FormattedMessage id="form.retypePass" />}
                type="password"
                name="retypePass"
                variant="filled"
                margin="dense"
                InputProps={{
                    disableUnderline: true,
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
                required
            />
            <ErrorMessage errors={errors} name="retypePass" as={<p className="error" />} />
            <Button type="submit" variant="contained" color="secondary" className={classes.form_btn}>
                <FormattedMessage id="form.btn.save" size="large" />
            </Button>
        </form>
    );
}

ChangePasswordTab.propTypes = {

};

export default ChangePasswordTab;
