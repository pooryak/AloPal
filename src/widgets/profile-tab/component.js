import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import {
    Grid, Box, IconButton, TextField,
    FormControl, InputLabel, Modal,
    Select, MenuItem, Button, Snackbar, Slide,
} from '@material-ui/core';
import SelectTimezoneMaterialUi from 'select-timezone-material-ui';
import dayjs from 'dayjs';
import MuiAlert from '@material-ui/lab/Alert';
import HelpIcon from '@material-ui/icons/Help';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useToken, useTranslation } from 'src/utility/hooks';
import clsx from 'clsx';
import { ErrorMessage } from '@hookform/error-message';
import { ApiProfileBaseUpdateRepository } from 'repository';
import { date } from 'src/utility';
import { getNames } from 'country-list';
import JalaliUtils from '@date-io/jalaali';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDayjs';
import decoder from 'compiled';
import constants from 'constants.js';
import { UserContext, Render } from 'src/components';
import { ModalContent } from './components';
import style from './style';

const countries = getNames();
function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}
function Profile(props) {
    const classes = style();
    const [snackState, setSnack] = useState();
    const [snackStateSuccess, setSnackSuccess] = useState();
    const {
        register, handleSubmit, errors, control, setError, setValue, reset, watch,
    } = useForm();
    const { data } = props;
    console.log('🚀 ~ file: component.js ~ line 28 ~ Profile ~ data', data);
    const tokenStatus = useToken();
    console.log('🚀 ~ file: component.js ~ line 22 ~ Profile ~ tokenStatus', tokenStatus);
    const registerMutation = useMutation((user) => ApiProfileBaseUpdateRepository.apiProfileBaseUpdatePost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.UpdateBaseProfileResponse.decode(apiData.data);
            console.log('🚀 ~ file: component.js ~ line 22 ~ registerMutation ~ decodedData', decodedData);
            setSnackSuccess(true);
        },
        onError: (error) => {
            console.log(error, 'error');
        },
    });
    useEffect(() => {
        const firstName = data?.profile?.privateInformation?.identification?.firstName || '';
        const lastName = data?.profile?.privateInformation?.identification?.lastName;
        const nameValue = firstName.concat(' ', lastName);
        const defaultDay = data?.profile?.privateInformation?.identification?.dateOfBirth.time || dayjs().format();
        const country = data?.profile?.privateInformation?.identification?.country?.value;
        const province = data?.profile?.privateInformation?.identification?.province?.value;
        const city = data?.profile?.privateInformation?.identification?.city?.value;
        const phone = data?.profile?.privateInformation?.communicationChannels?.phoneNumber;
        const currency = data?.profile?.currency;
        const skypeId = data?.profile?.privateInformation?.communicationChannels?.skypeId;
        const timeZone = data?.profile?.timeZone;
        console.log('🚀 ~ file: component.js ~ line 64 ~ useEffect ~ timeZone', timeZone);
        reset({
            name: nameValue,
            dateOfBirth: defaultDay,
            country,
            province,
            city,
            phone,
            currency,
            skypeId,
            timeZone,

        });
    }, [data?.profile]);
    const postProfile = async (formData) => {
        const [firstName, lastName] = formData.name.split(' ');
        const dataWithCaptcha = {
            profileData: {
                id: {
                    value: data.profile.id.value,
                },
                publiclyVisibleInfo: {
                    // nickName: 'PouRya',
                    profileImageId: 'https://miro.medium.com/max/390/1*FjkV9a9lcKTObyZIimDqyg.jpeg',
                },
                privateInformation: {
                    identification: {
                        firstName,
                        lastName,
                        dateOfBirth: {
                            time: dayjs(formData.dateOfBirth).format(),
                        },
                        country: {
                            value: formData.country,
                        },
                        province: {
                            value: formData.province,
                        },
                        city: {
                            value: formData.city,
                        },
                    },
                    communicationChannels: {
                        phoneNumber: formData.phone,
                        skypeId: formData.skypeId,
                    },
                },
                currency: formData.currency,
                receiveNews: data.profile.receiveNews,
                timeZone: formData.timeZone,
            },
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
        };
        const verify = decoder.alopal.backend.services.UpdateBaseProfileRequest.create(dataWithCaptcha);
        console.log('🚀 ~ file: component.js ~ line 33 ~ postProfile ~ verify', verify);
        const encodedData = decoder.alopal.backend.services.UpdateBaseProfileRequest.encode(verify).finish();
        console.log('🚀 ~ file: component.js ~ line 35 ~ postProfile ~ encodedData', encodedData);
        await registerMutation.mutateAsync(encodedData);
        // const decodedData = decoder.alopal.backend.services.UpdateBaseProfileRequest.decode(datacv.data);
        // console.log('🚀 ~ file: auth.js ~ line 94 ~ signup ~ decodedData', decodedData);
    };
    const onSubmit = async (formValue, e) => {
        e.preventDefault();
        console.log(e, 'E', data, 'data', formValue, 'formValue');
        const birthdayChecker = date.over18(formValue.dateOfBirth);
        if (!birthdayChecker) setError('dateOfBirth', { type: 'manual', message: 'you are not over 18' }, true);
        // if (formValue.password !== formValue.retypePass) setError('retypePass', { type: 'manual', message: <FormattedMessage id="form.notSame" /> });
        try {
            await postProfile(formValue);
        } catch (error) {
            console.log('🚀 ~ file: component.js ~ line 71 ~ onSubmit ~ error', error);
            console.log('🚀 ~ file: component.js ~ line 1 ~ onSubmit ~ error.response', error.response);
            const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
            setSnack({ message: errResponse.responseContext?.status?.message });
            // setErr(errResponse.responseContext?.status?.message);
        }
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnack = () => {
        setSnack(false);
    };
    const handleSnackSuccess = () => {
        setSnackSuccess(false);
    };

    // const country = data?.profile?.privateInformation?.identification?.country?.value;
    const selectedCountry = watch('country');
    console.log('🚀 ~ file: component.js ~ line 128 ~ Profile ~ selectedCountry', selectedCountry);
    const selectedCurrency = watch('currency');
    console.log('🚀 ~ file: component.js ~ line 130 ~ Profile ~ selectedCurrency', selectedCurrency);
    const selectedTimeZone = watch('timeZone');
    console.log('🚀 ~ file: component.js ~ line 130 ~ Profile ~ selectedCurrency', selectedTimeZone);
    const userSetting = useContext(UserContext);
    return (
        <form data-testid="form" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Snackbar
                open={snackState}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={TransitionLeft}
                message={snackState?.message}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSnack} severity="error">
                    {snackState?.message}
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={snackStateSuccess}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={TransitionLeft}
                message={snackState?.message}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackSuccess} severity="success">
                    Succesfully Updated
                </MuiAlert>
            </Snackbar>
            <TextField
                inputRef={register({ required: true })}
                id="outlined-Name"
                label={<FormattedMessage id="name" />}
                type="text"
                name="name"
                // defaultValue={nameValue || ''}
                autoComplete="name"
                variant="filled"
                required
                InputProps={{
                    disableUnderline: true,
                }}
                margin="normal"
            />
            <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: true }}
                // defaultValue={defaultDay}
                render={({ onChange, value }) => (
                    <>
                        <Render condition={userSetting.direction === 'rtl'}>
                            <LocalizationProvider dateAdapter={JalaliUtils}>
                                <DatePicker
                                    label="Basic example"
                                    value={new Date(value)}
                                    onChange={(newValue) => {
                                        console.log(dayjs(newValue).format(), 'nnewvalue');
                                        onChange(dayjs(newValue).format());
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="filled"
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                            // {...params}
                                        />
                                    )}
                                    // inputFormat="yyyy/MM/dd"
                                    maxDate={new Date()}
                                />
                            </LocalizationProvider>
                        </Render>
                        <Render condition={userSetting.direction !== 'rtl'}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label={<FormattedMessage id="form.date_of_birth" />}
                                    value={new Date(value)}
                                    onChange={(newValue) => {
                                        console.log(dayjs(newValue).format(), 'nnewvalue');
                                        onChange(dayjs(newValue).format());
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                            required
                                            margin="normal"
                                        />
                                    )}
                                    // inputFormat="yyyy/MM/dd"
                                    maxDate={new Date()}
                                />
                            </LocalizationProvider>

                        </Render>
                    </>
                )}
            />
            <ErrorMessage errors={errors} name="dateOfBirth" as={<p className="error" />} />
            <Grid cotainer direction="row" className={classes.form_row}>
                <Controller
                    control={control}
                    name="country"
                    value={selectedCountry}
                    as={(
                        <TextField
                            className={clsx(classes.formControl,classes.country)}
                            label={<FormattedMessage id="form.country" />}
                            select
                            value={selectedCountry}
                            onChange={(event) => setValue('country', event.target.value)}
                            id="country-select"
                            SelectProps={{
                                native: true,
                            }}
                            variant="filled"
                            InputProps={{
                                disableUnderline: true,
                            }}
                        >
                            {countries.map((title) => (
                                <option key={title} value={title}>
                                    {title}
                                </option>
                            ))}
                        </TextField>

                    )}
                />
                <TextField
                    className={classes.formControl}
                    inputRef={register({ required: true })}
                    id="outlined-province"
                    label={<FormattedMessage id="form.province" />}
                    type="text"
                    name="province"
                    autoComplete="province"
                    variant="filled"
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
            </Grid>
            <TextField
                inputRef={register()}
                id="outlined-city"
                label={<FormattedMessage id="form.city" />}
                type="text"
                name="city"
                autoComplete="city"
                className={classes.formControl}
                variant="filled"
                InputProps={{
                    disableUnderline: true,
                }}
            />
            <FormControl
                inputRef={register({ required: true })}
                name="timeZone"
                variant="filled"
                InputProps={{
                    disableUnderline: true,
                }}
                required
                className={classes.timeZone_wrapper}
            >
                <Controller
                    control={control}
                    name="timeZone"
                    as={(
                        <SelectTimezoneMaterialUi
                            label="Timezone"
                            showTimezoneOffset
                            variant="filled"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            InputLabelProps={{ disableUnderline: true }}
                            helperText="Please select a timezone from the list"
                            timezoneName={selectedTimeZone}
                            onChange={(timeZoneName, timeZoneOffset) => setValue('timeZone', timeZoneName)}
                        />
                    )}
                />
            </FormControl>
            <TextField
                inputRef={register({ required: true })}
                id="outlined-phone"
                label={<FormattedMessage id="form.phone" />}
                type="phone"
                name="phone"
                autoComplete="phone"
                variant="filled"
                required
                InputProps={{
                    disableUnderline: true,
                }}
            />
            <Controller
                control={control}
                name="currency"
                value={selectedCurrency}
                as={(
                    <TextField
                        id="currency"
                        className={classes.input_currency}
                        select
                        name="currency"
                        label={<FormattedMessage id="form.currency" />}
                        onChange={(event) => setValue('currency', event.target.value)}
                        SelectProps={{
                            native: true,
                        }}
                        variant="filled"
                        InputProps={{
                            disableUnderline: true,
                        }}
                    >
                        {constants.currencies.map((title) => (
                            <option key={title} value={title}>
                                {title}
                            </option>
                        ))}
                    </TextField>
                )}
            />
            <Box display="flex" marginTop={1}>
                <TextField
                    inputRef={register()}
                    id="outlined-SkypeID"
                    label={<FormattedMessage id="form.SkypeID" />}
                    name="skypeId"
                    autoComplete="skypeId"
                    variant="filled"
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
                <IconButton aria-label="more" onClick={handleOpen}>
                    <HelpIcon />
                </IconButton>
            </Box>
            <Button type="submit" variant="contained" color="secondary" className={classes.form_btn}>
                <FormattedMessage id="form.btn.save" size="large" />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ModalContent handleClose={handleClose} />
            </Modal>
        </form>
    );
}

Profile.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Profile;
