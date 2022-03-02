import { useEffect, useContext, useState } from 'react';
import { Render, UserContext } from 'src/components';
import {
    InputAdornment, IconButton, Grid, Box,
    Typography, TextField, FormControl, Avatar,
    Divider, MenuItem, FormControlLabel, Checkbox,
    Button,
} from '@material-ui/core';
import JalaliUtils from '@date-io/jalaali';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDayjs';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SelectTimezoneMaterialUi from 'select-timezone-material-ui';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Link from 'next/link';
// import { DatePicker } from '@material-ui/pickers';
import { getNames } from 'country-list';
import constants from 'constants.js';
import { date } from 'src/utility';
import PropTypes from 'prop-types';
import style from './style';

const countries = getNames();
function UploadFormatCustom(props) {
    const {
        avatar, name, register,
    } = props;
    const classes = style();

    return (
        <div className={classes.input}>
            <label htmlFor={name} className={classes.label}>
                <Avatar />
                <Button variant="outlined" color="primary"><FormattedMessage id="form.upload_image" /></Button>
                <input
                    ref={register}
                    accept="image/*"
                    className={classes.input}
                    id={name}
                    multiple
                    type="file"
                    name={name}
                    // onChange={handleUpload}
                />
            </label>
            <Grid constainer xs={12} className={classes.divider}>
                <Grid container xs={5} justifyContent="center" className={classes.divider_itm}>
                    <Divider flexItem variant="middle" />

                </Grid>
                <Grid container xs={2} justifyContent="center" className={classes.divider_itm}>
                    <FormattedMessage id="common.or" />
                </Grid>
                <Grid item xs={5} justifyContent="center" className={classes.divider_itm}>
                    <Divider flexItem variant="middle" />
                </Grid>
            </Grid>
            <Box mt={2}>
                <FormattedMessage id="form.selectAvatar" />
            </Box>
            <Box display="flex" mt={1} flexWrap="wrap" justifyContent="space-between">
                {Array(18).fill().map((item) => <Avatar className={classes.available_avatar} />)}
            </Box>
        </div>
    );
}
const defaultDay = new Date();
function ProfileForm(props) {
    const classes = style();
    const { submit } = props;
    const [showPassword, setShowPassword] = useState();
    const userSetting = useContext(UserContext);
    const {
        register, handleSubmit, control, setError, errors, setValue,
    } = useForm();
    useEffect(() => {
        register({ name: 'dateOfBirth' });
    }, [register]);
    const onSubmit = (data) => {
        console.log('🚀 ~ file: component.js ~ line 63 ~ onSubmit ~ data', data);
        const birthdayChecker = date.over18(data.dateOfBirth);
        if (!birthdayChecker) return setError('dateOfBirth', { type: 'manual', message: 'you are not over 18' }, true);
        if (data.password !== data.retypePass) return setError('retypePass', { type: 'manual', message: <FormattedMessage id="form.notSame" /> });
        submit(data);
    };
    function handleClickShowPassword() {
        setShowPassword((prevState) => !prevState);
    }
    function handleMouseDownPassword(event) {
        event.preventDefault();
    }
    return (
        <Grid>
            <Box fontWeight={400} className={classes.info_box} fontSize={23}>
                <FormattedMessage id="registercompletion.email_confirm" />
            </Box>
            <Typography variant="h4" fontWeight={700} mb={2} className={classes.header_title}>
                <FormattedMessage id="registercompletion.complete" />
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    inputRef={register({ required: true })}
                    id="outlined-Name"
                    label={<FormattedMessage id="name" />}
                    type="text"
                    name="name"
                    autoComplete="name"
                    variant="filled"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    required
                    margin="normal"
                />
                <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={defaultDay}
                    render={({ onChange, value }) => (
                        <>
                            <Render condition={userSetting.direction === 'rtl'}>
                                <LocalizationProvider dateAdapter={JalaliUtils}>
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
                                            />
                                        )}
                                        // inputFormat="yyyy/MM/dd"
                                        maxDate={new Date()}
                                        margin="normal"
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
                        as={(
                            <TextField
                                variant="filled"
                                select
                                name="country"
                                label={<FormattedMessage id="form.country" />}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                id="country-select"
                                required
                                className={classes.formControl}
                                margin="normal"
                            >
                                {countries.map((title) => (
                                    <MenuItem key={title} value={title}>
                                        {title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <ErrorMessage errors={errors} name="country" as={<p className="error" />} />
                    <TextField
                        className={classes.formControl}
                        id="outlined-province"
                        label={<FormattedMessage id="form.province" />}
                        type="text"
                        name="province"
                        autoComplete="name"
                        variant="filled"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        required
                        inputRef={register({ required: true })}
                        margin="normal"
                    />
                </Grid>
                <TextField
                    inputRef={register()}
                    // className={classes.formControl}
                    id="outlined-city"
                    label={<FormattedMessage id="form.city" />}
                    type="text"
                    name="city"
                    autoComplete="city"
                    variant="filled"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    margin="normal"
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
                    InputProps={{
                        disableUnderline: true,
                    }}
                    required
                    margin="normal"
                />
                <Controller
                    control={control}
                    name="currency"
                    as={(
                        <TextField
                            variant="filled"
                            select
                            name="currency"
                            label={<FormattedMessage id="form.currency" />}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            id="currency-select"
                            required
                            className={classes.formControl}
                            margin="normal"
                        >
                            {constants.currencies.map((title) => (
                                <MenuItem key={title} value={title}>
                                    {title}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
                <ErrorMessage errors={errors} name="currency" as={<p className="error" />} />
                <TextField
                    label={<FormattedMessage id="form.profile_picture" />}
                    // value={values.numberformat}
                    // onChange={handleChange}
                    name="profile_picture"
                    id="formatted-numberformat-input"
                    variant="filled"
                    margin="normal"
                    InputProps={{
                        disableUnderline: true,
                        inputComponent: () => (
                            <UploadFormatCustom
                                avatar
                                // handleChange={handleChange}
                                name="avatar"
                                register={register}
                            />
                        ),
                    }}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    inputRef={register({ required: true })}
                    id="outlined-password"
                    label={<FormattedMessage id="form.password" />}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="password"
                    variant="filled"
                    margin="normal"
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
                <TextField
                    inputRef={register({ required: true })}
                    id="outlined-repassword"
                    label={<FormattedMessage id="form.retypePass" />}
                    type="password"
                    name="retypePass"
                    autoComplete="password"
                    variant="filled"
                    margin="normal"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    required
                />
                <ErrorMessage errors={errors} name="retypePass" as={<p className="error" />} />
                <FormControlLabel
                    control={(
                        <Checkbox
                            icon={<CircleUnchecked className={classes.icon} />}
                            checkedIcon={<CircleChecked className={classes.icon} />}
                        />
                    )}
                    label={<FormattedMessage id="form.under18" />}
                    inputRef={register}
                    name="under18"
                    id="under18"
                    required
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            icon={<CircleUnchecked className={classes.icon} />}
                            checkedIcon={<CircleChecked className={classes.icon} />}
                        />
                    )}
                    label={<FormattedMessage id="form.newsletter" />}
                    inputRef={register}
                    name="receiveNews"
                    id="receiveNews"
                    required
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            icon={<CircleUnchecked className={classes.icon} />}
                            checkedIcon={<CircleChecked className={classes.icon} />}
                        />
                    )}
                    label={(
                        <div className={classes.checkbox_label}>
                            <FormattedMessage id="terms" />
                            <Link href="/terms">
                                <a className={classes.temrs_link}>
                                    <FormattedMessage id="conditions" />
                                </a>
                            </Link>
                        </div>
                    )}
                    inputRef={register({ required: true })}
                    name="terms"
                    id="terms"
                    required
                />
                <ErrorMessage errors={errors} name="terms" as={<p className="error" />} message={<FormattedMessage id="form.required" />} />
                <Button type="submit" variant="contained" color="secondary" className={classes.form_btn}>
                    <FormattedMessage id="form.btn.complete" />
                </Button>
            </form>
        </Grid>
    );
}

ProfileForm.propTypes = {

};

export default ProfileForm;
