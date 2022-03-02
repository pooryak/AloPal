import {
    Paper, Box, Button, Select, Input, MenuItem, InputLabel, Divider, TextField,
} from '@material-ui/core';
import { useState, useContext, useEffect } from 'react';
import { PageTitle, UserContext, Render } from 'src/components';
import dayjs from 'dayjs';
import { getHourMinutes, getFullDay } from 'src/utility/date';
import JalaliUtils from '@date-io/jalaali';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import differenceInDays from 'date-fns/differenceInDays';
import isBetween from 'dayjs/plugin/isBetween';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { ApiProfileServiceCurrentRepository, ApiProfileServiceTimeAddRepository } from 'repository';
import DatePicker from '@material-ui/lab/DatePicker';
import MobileTimePicker from '@material-ui/lab/MobileTimePicker';
import { FormattedMessage } from 'react-intl';
import { useToken } from 'src/utility/hooks';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import decoder from 'compiled';

console.log('🚀 ~ file: index.js ~ line 20 ~ decoder', decoder);

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
        padding: theme.spacing(2, 2),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    datepickers: {
        display: 'flex',
        width: '60%',
        justifyContent: 'space-between',
    },
    daysSelector: {
        backgroundColor: theme.palette.grey[300],
        borderRadius: theme.spacing(0.5),
    },
    select: {
        width: 250,
    },
    container: {
        padding: theme.spacing(1, 2),
        backgroundColor: theme.palette.grey[200],
        borderRadius: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
    },
    time_wrapper: {
        margin: theme.spacing(2),
        flexDirection: 'column',
        '& > $div': {
            margin: theme.spacing(1),
        },
    },
    review_wrapper: {
        marginBottom: theme.spacing(1),
    },
}));

const names = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

function Allocation(props) {
    const classes = useStyles();
    const [DatesTimes, setDatesTimes] = useState([{
        startDay: null,
        endDate: null,
        times: [{
            startTime: null,
            endTime: null,
        }],
    }]);
    const [userServiceProfile, setData] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [dateResults, setDateResults] = useState([]);
    const userSetting = useContext(UserContext);
    const tokenStatus = useToken();
    const [state, setState] = useState(true);
    const registerMutation = useMutation((user) => ApiProfileServiceCurrentRepository.apiProfileServiceCurrentPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.GetCurrentServiceProfileResponse.decode(apiData.data);
            console.log('🚀 ~ file: index.js ~ line 115 ~ registerMutation ~ decodedData', decodedData);
            setData(decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });

    const fetchApi = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
        };
        const verify = decoder.alopal.backend.services.GetCurrentServiceProfileRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.GetCurrentServiceProfileRequest.encode(verify).finish();
        const datacv = await registerMutation.mutateAsync(encodedData);
    };
    useEffect(() => {
        if (tokenStatus?.token?.token) {
            fetchApi();
        }
    }, [tokenStatus.token]);

    const handleWeekDay = (event, index) => {
        const newState = [...DatesTimes];
        newState[index].startDay = event.target.value;
        setDatesTimes(newState);
    };

    const changeTimeDate = (value, index, name, idx) => {
        console.log(value, index, name, idx);
        const newState = [...DatesTimes];
        newState[index].times[idx][name] = value;
        setDatesTimes(newState);
    };

    const addNewDay = () => {
        const newState = [...DatesTimes];
        newState.push({
            startDay: null,
            endDate: null,
            times: [{
                startTime: null,
                endTime: null,
            }],
        });
        setDatesTimes(newState);
    };

    const addNewTime = (index) => {
        const newState = [...DatesTimes];
        newState[index].times.push({
            startTime: null,
            endTime: null,
        });
        setDatesTimes(newState);
    };

    const getDaysBetweenDates = (start, end, day) => {
        const test = differenceInDays(new Date(end), new Date(start));
        const test2 = dayjs('2021-8-4').isBetween(start, end, '[]');
        console.log('🚀 ~ file: index.js ~ line 163 ~ getDaysBetweenDates ~ test2', test2);
        console.log('🚀 ~ file: index.js ~ line 161 ~ getDaysBetweenDates ~ test', test);
        const result = [];
        const days = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
        };
        const dayValue = days[day];
        const current = new Date(start);
        current.setDate(current.getDate() + ((dayValue + 7 - current.getDay()) % 7));
        console.log('🚀 ~ file: index.js ~ line 179 ~ getDaysBetweenDates ~ current', current);
        while (current < end) {
            result.push(new Date(+current));
            current.setDate(current.getDate() + 7);
        }
        console.log(result, 'result');
        return setDateResults(result);
    };

    const reviewHandler = () => {
        console.log(DatesTimes, 'DatesTimes', startDate, 'startDate', endDate, 'endDate');
        DatesTimes.map((item) => getDaysBetweenDates(startDate, endDate, item.startDay));
        setState(false);
    };

    const registerTimeSlots = useMutation((user) => ApiProfileServiceTimeAddRepository.apiProfileServiceTimeAddPost(user), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.SetTimeSlotsForServiceResponse.decode(data.data);
            // const router = useRouter();
        },
        onError: (error) => {
            console.log('🚀 ~ file: index.js ~ line 190 ~ registerTimeSlots ~ error', error);
            const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
            console.log('🚀 ~ file: index.js ~ line 192 ~ registerTimeSlots ~ errResponse', errResponse);
        },
    });

    const verifyTime = async () => {
        const newData = DatesTimes.map((item) => item.times.map((items) => dateResults.map((element) => {
            const startTime = { time: dayjs(element.setHours(items.startTime.getHours(), items.startTime.getMinutes())).format() };
            const endTime = { time: dayjs(element.setHours(items.endTime.getHours(), items.endTime.getMinutes())).format() };
            const serviceProfileId = {
                value: userServiceProfile.profile.id.value,
            };
            return { startTime, endTime, serviceProfileId };
        })));
        const flatTimes = newData.flat(Infinity);
        const finalData = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            timeSlots: flatTimes,
        };
        const verify = decoder.alopal.backend.services.SetTimeSlotsForServiceRequest.create(finalData);
        const encodedData = decoder.alopal.backend.services.SetTimeSlotsForServiceRequest.encode(verify).finish();
        const datacv = await registerTimeSlots.mutateAsync(encodedData);
    };

    return (
        <Paper elevation={1} className={classes.root}>
            <PageTitle>
                <FormattedMessage id="pal.dateManagement.allocatedTime.button" />
            </PageTitle>
            <Box fontSize={18} marginTop={2}>
                <FormattedMessage id={state ? 'pal.dateManagement.allocatedTime.subtitle'
                    : 'pal.dateManagement.allocatedTime.subtitle2'}
                />
            </Box>
            {
                state ? (
                    <div>
                        <Box className={classes.datepickers} marginTop={2}>
                            <Render condition={userSetting.direction === 'rtl'}>
                                <LocalizationProvider dateAdapter={JalaliUtils}>

                                    <DatePicker
                                        label={<FormattedMessage id="general.from_date" />}
                                        value={startDate}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                    <DatePicker
                                        label={<FormattedMessage id="general.to_date" />}
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />

                                </LocalizationProvider>
                            </Render>
                            <Render condition={userSetting.direction !== 'rtl'}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DatePicker
                                        label={<FormattedMessage id="general.from_date" />}
                                        value={startDate}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                    <DatePicker
                                        label={<FormattedMessage id="general.to_date" />}
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />

                                </LocalizationProvider>

                            </Render>
                        </Box>
                        {
                            DatesTimes.map((item, index) => (
                                <div>

                                    <Box
                                        marginTop={2}
                                        padding={2}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        className={classes.daysSelector}
                                    >
                                        <Box>
                                            <InputLabel id="demo-mutiple-name-label"><FormattedMessage id="general.days" /></InputLabel>
                                            <Select
                                                labelId="demo-mutiple-name-label"
                                                id="demo-mutiple-name"
                                                label="days"
                                                value={item.startDay}
                                                onChange={(e) => handleWeekDay(e, index)}
                                                input={<Input />}
                                                className={classes.select}
                                            >
                                                {names.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Box>
                                        <Box className={classes.time_wrapper}>
                                            {
                                                item.times.map((items, idx) => (
                                                    <div>
                                                        <Render condition={userSetting.direction === 'rtl'}>
                                                            <LocalizationProvider dateAdapter={JalaliUtils}>

                                                                <MobileTimePicker
                                                                    label={<FormattedMessage id="general.from_time" />}
                                                                    value={items.startTime}
                                                                    minutesStep={5}
                                                                    onChange={(newValue) => changeTimeDate(newValue,
                                                                        index, 'startTime', idx)}
                                                                    renderInput={(params) => <TextField {...params} />}
                                                                />
                                                                <MobileTimePicker
                                                                    label={<FormattedMessage id="general.to_time" />}
                                                                    value={items.endTime}
                                                                    minutesStep={5}
                                                                    onChange={(newValue) => changeTimeDate(newValue,
                                                                        index, 'endTime', idx)}
                                                                    renderInput={(params) => <TextField {...params} />}
                                                                />

                                                            </LocalizationProvider>
                                                        </Render>
                                                        <Render condition={userSetting.direction !== 'rtl'}>
                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>

                                                                <MobileTimePicker
                                                                    label={<FormattedMessage id="general.from_time" />}
                                                                    minutesStep={5}
                                                                    value={items.startTime}
                                                                    onChange={(newValue) => changeTimeDate(newValue,
                                                                        index, 'startTime', idx)}
                                                                    renderInput={(params) => <TextField {...params} />}
                                                                />
                                                                <MobileTimePicker
                                                                    label={<FormattedMessage id="general.to_time" />}
                                                                    minutesStep={5}
                                                                    value={items.endTime}
                                                                    onChange={(newValue) => changeTimeDate(newValue,
                                                                        index, 'endTime', idx)}
                                                                    renderInput={(params) => <TextField {...params} />}
                                                                />
                                                            </LocalizationProvider>

                                                        </Render>

                                                    </div>
                                                ))
                                            }

                                        </Box>

                                        <Button
                                            startIcon={<AddCircleIcon />}
                                            onClick={() => addNewTime(index)}
                                        >
                                            <FormattedMessage id="page.date_managment.add_time" />

                                        </Button>
                                    </Box>
                                </div>
                            ))
                        }
                        <Box marginTop={2}>
                            <Button
                                startIcon={<AddCircleIcon />}
                                onClick={addNewDay}
                            >
                                <FormattedMessage id="page.date_managment.add_day" />

                            </Button>
                        </Box>
                        <Box marginTop={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={reviewHandler}
                            >
                                <FormattedMessage id="page.date_managment.review" />

                            </Button>
                        </Box>
                    </div>
                )
                    : (
                        <Box marginTop={2}>
                            {
                                DatesTimes.map((item) => (
                                    <div className={classes.review_wrapper}>
                                        <Box onClick={() => setState(true)}>
                                            {item.startDay}
                                        </Box>
                                        <Box display="flex" marginTop={2} flexDirection="column">

                                            {
                                                dateResults.map((element) => (
                                                    <Box display="flex" justifyContent="space-between" className={classes.container}>

                                                        <Box display="flex" alignSelf="stretch" fontWeight={700} justifyContent="center">
                                                            {getFullDay(element)}
                                                        </Box>
                                                        {
                                                            item.times.map((items) => (
                                                                <>
                                                                    {' '}
                                                                    <Divider orientation="vertical" flexItem />
                                                                    <Box display="flex" alignSelf="stretch" justifyContent="center">
                                                                        {getHourMinutes(items.startTime)}
                                                                        {' '}
                                                                        -
                                                                        {getHourMinutes(items.endTime)}
                                                                    </Box>
                                                                    <Box display="flex" alignSelf="stretch" justifyContent="center" />
                                                                </>
                                                            ))
                                                        }
                                                    </Box>
                                                ))
                                            }
                                        </Box>

                                    </div>
                                ))
                            }

                            <Box marginTop={2}>
                                <Button variant="contained" color="primary" onClick={verifyTime}>
                                    <FormattedMessage id="page.date_managment.verify" />
                                </Button>
                            </Box>
                        </Box>
                    )
            }

        </Paper>
    );
}

Allocation.propTypes = {

};

export default Allocation;
