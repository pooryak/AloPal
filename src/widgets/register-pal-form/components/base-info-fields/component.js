import {
    TextField, Radio, RadioGroup, Select,
    FormControlLabel, InputLabel, MenuItem, FormControl, Grid,
} from '@material-ui/core';
import SelectTimezoneMaterialUi from 'select-timezone-material-ui';
import { Controller } from 'react-hook-form';
import { Render, UserContext } from 'src/components';
import JalaliUtils from '@date-io/jalaali';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDayjs';
import { getNames } from 'country-list';
import { ErrorMessage } from '@hookform/error-message';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import style from './style';

const defaultDay = dayjs().format();
const countries = getNames();
function BaseInfoFields(props) {
    const {
        register, control, errors, setValue,
    } = props;
    const classes = style();
    const userSetting = useContext(UserContext);
    return (
        <div className={classes.form}>
            <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                defaultValue={2}
                render={({ onChange, value }) => (
                    <FormControl>
                        <RadioGroup
                            id="gender"
                            value={Number(value)}
                            defaultChecked={2}
                            onChange={(e) => onChange(e.target.value)}
                            inputRef={register({ required: true })}
                            row
                            aria-label="title"
                            name="gender"
                            className={classes.titles}
                        >
                            <FormControlLabel
                                value={2}
                                control={<Radio />}
                                label={<FormattedMessage id="form.gender.female" />}
                            />
                            <FormControlLabel
                                value={1}
                                control={<Radio />}
                                label={<FormattedMessage id="form.gender.male" />}
                            />
                            <FormControlLabel
                                value={3}
                                control={<Radio />}
                                label={<FormattedMessage id="form.gender.other" />}
                            />
                        </RadioGroup>
                    </FormControl>
                )}
            />
            <TextField
                inputRef={register({ required: true })}
                id="outlined-first-Name"
                label={<FormattedMessage id="first.name" />}
                type="text"
                name="firstName"
                autoComplete="firstName"
                variant="outlined"
                required
            />
            <TextField
                inputRef={register({ required: true })}
                id="outlined-last-Name"
                label={<FormattedMessage id="last.name" />}
                type="text"
                name="lastName"
                autoComplete="lastName"
                variant="outlined"
                required
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
                                    label="Basic example"
                                    value={new Date(value)}
                                    onChange={(newValue) => {
                                        onChange(dayjs(newValue).format());
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    // inputFormat="yyyy/MM/dd"
                                    maxDate={new Date()}
                                />
                            </LocalizationProvider>
                        </Render>
                        <Render condition={userSetting.direction !== 'rtl'}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Basic example"
                                    value={new Date(value)}
                                    onChange={(newValue) => {
                                        onChange(dayjs(newValue).format());
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    // inputFormat="yyyy/MM/dd"
                                    maxDate={new Date()}
                                />
                            </LocalizationProvider>

                        </Render>
                    </>
                )}
            />
            <ErrorMessage errors={errors} name="dateOfBirth" as={<p className="error" />} />
            <TextField
                inputRef={register({ required: true })}
                id="outlined-National-code"
                label={<FormattedMessage id="form.national_code" defaultMessage="National Code" />}
                type="number"
                name="national_code"
                autoComplete="national_code"
                variant="outlined"
                required
            />
            <ErrorMessage errors={errors} name="dateOfBirth" as={<p className="error" />} />
            <TextField
                inputRef={register({ required: true })}
                id="outlined-email"
                label={<FormattedMessage id="form.email" defaultMessage="Email" />}
                type="email"
                name="email"
                autoComplete="email"
                variant="outlined"
                required
            />
            <ErrorMessage errors={errors} name="email" as={<p className="error" />} />
            <Grid cotainer direction="row" className={classes.form_row}>
                <FormControl
                    inputRef={register({ required: true })}
                    name="country"
                    variant="outlined"
                    required
                    className={classes.formControl}
                >
                    <InputLabel
                        inputRef={register({ required: true })}
                        htmlFor="country-select"
                    >
                        <FormattedMessage id="form.country" />
                    </InputLabel>
                    <Controller
                        control={control}
                        name="country"
                        as={(
                            <Select id="country-select">
                                {countries.map((title) => (
                                    <MenuItem key={title} value={title}>
                                        {title}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>
                <TextField
                    className={classes.formControl}
                    inputRef={register()}
                    id="outlined-province"
                    label={<FormattedMessage id="form.province" />}
                    type="text"
                    name="province"
                    autoComplete="province"
                    variant="outlined"
                />
            </Grid>
            <ErrorMessage errors={errors} name="province" as={<p className="error" />} />
            <Grid cotainer direction="row" className={classes.form_row}>

                <TextField
                    inputRef={register()}
                    className={classes.formControl}
                    id="outlined-city"
                    label={<FormattedMessage id="form.city" />}
                    type="text"
                    name="city"
                    autoComplete="city"
                    variant="outlined"
                />
                <FormControl
                    inputRef={register({ required: true })}
                    name="timeZone"
                    variant="outlined"
                    required
                    className={classes.formControl}
                >
                    <Controller
                        control={control}
                        name="timeZone"
                        as={(
                            <SelectTimezoneMaterialUi
                                label="Timezone"
                                showTimezoneOffset
                                variant="outlined"
                                helperText="Please select a timezone from the list"
                                onChange={(timeZoneName, timeZoneOffset) => setValue('timeZone', timeZoneName)}
                            />
                        )}
                    />
                </FormControl>
            </Grid>
            <TextField
                inputRef={register()}
                id="outlined-phone"
                label={<FormattedMessage id="form.phone" />}
                type="phone"
                name="phone"
                autoComplete="phone"
                variant="outlined"
            />
            <TextField
                inputRef={register()}
                id="outlined-Postal-Code"
                label={<FormattedMessage id="form.postal_code" defaultMessage="Postal Code" />}
                type="number"
                name="postal_code"
                autoComplete="postal_code"
                variant="outlined"
            />
            <TextField
                inputRef={register()}
                id="outlined-Address"
                label={<FormattedMessage id="form.address" defaultMessage="Address" />}
                type="text"
                name="address"
                autoComplete="address"
                variant="outlined"
            />
            <TextField
                inputRef={register({ required: true })}
                id="outlined-SkypeID"
                label={<FormattedMessage id="form.SkypeID" />}
                name="skypeId"
                autoComplete="skypeId"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                inputRef={register({ required: true })}
                id="outlined-password"
                label={<FormattedMessage id="form.password" />}
                type="password"
                name="password"
                autoComplete="password"
                variant="outlined"
                required
            />
            <TextField
                inputRef={register({ required: true })}
                id="outlined-repassword"
                label={<FormattedMessage id="form.retypePass" />}
                type="password"
                name="retypePass"
                autoComplete="password"
                variant="outlined"
                required
            />
            <ErrorMessage errors={errors} name="retypePass" as={<p className="error" />} />
        </div>
    );
}

BaseInfoFields.propTypes = {
    register: PropTypes.object.isRequired,
    control: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default BaseInfoFields;
