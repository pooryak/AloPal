import {
    Paper, Box, Button,
    List,
    ListItem, TextField,
    ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
    useState, useEffect, useContext, useCallback, useMemo,
} from 'react';
import { PageTitle, Render, UserContext } from 'src/components';
import JalaliUtils from '@date-io/jalaali';
import clsx from 'clsx';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimerIcon from '@material-ui/icons/Timer';
import { useToken } from 'src/utility/hooks';
import PickersDay from '@material-ui/lab/PickersDay';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDayjs';
import { useMutation } from 'react-query';
import { getFullDay, getHourMinutes } from 'src/utility/date';
import dayjs from 'dayjs';
import Link from 'next/link';
import { ApiProfileServiceTimeGetAllRepository, ApiProfileServiceCurrentRepository ,ApiMessageSendRepository} from 'repository';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import decoder from 'compiled';

console.log('🚀 ~ file: index.js ~ line 24 ~ decoder', decoder);

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
    test: {
        marginLeft: theme.spacing(),
        padding: theme.spacing(2, 1),
        flex: 1,
        backgroundColor: theme.palette.grey[300],
        borderRadius: theme.spacing(0.5),
    },
    highlight: {
        borderRadius: '50%',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
}));

function DateManagment(props) {
    const classes = useStyles();
    const [date, changeDate] = useState(new Date());
    const [value, setValue] = useState(new Date());
    const [visibleHours, setVisibleHours] = useState([]);
    const [serviceData, setServiceData] = useState();
    const [userServiceProfile, setData] = useState();
    const userSetting = useContext(UserContext);
    console.log('🚀 ~ file: index.js ~ line 42 ~ DateManagment ~ userServiceProfile', userServiceProfile);
    const tokenStatus = useToken();
    const dateSelector = (date) => {
        console.log(date);
        changeDate(date);
        const selectedTime = new Date(date).setHours(0, 0, 0, 0);
        console.log('🚀 ~ file: index.js ~ line 71 ~ dateSelector ~ selectedTime', selectedTime);
        const selectedSlots = userServiceProfile?.timeSlots?.filter((item) => {
            const start = new Date(item.startTime.time).setHours(0, 0, 0, 0);
            console.log('🚀 ~ file: index.js ~ line 74 ~ selectedSlots ~ start', start);
            if (start === selectedTime) {
                return item;
            }
            return null;
        });
        setVisibleHours(selectedSlots);
    };
    const registerMutation = useMutation((user) => ApiProfileServiceCurrentRepository.apiProfileServiceCurrentPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.GetCurrentServiceProfileResponse.decode(apiData.data);
            console.log('🚀 ~ file: index.js ~ line 115 ~ registerMutation ~ decodedData', decodedData);
            setServiceData(decodedData);
            const time = {
                startTime: dayjs(new Date(new Date().getFullYear(),
                    new Date().getMonth() - 1,
                    new Date().getDate())).format(),
                endTime: dayjs(new Date(new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    new Date().getDate())).format(),
            };
            fetchApi(decodedData, time);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });

    const fetchUserData = async () => {
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

    const getTimeSlots = useMutation((user) => ApiProfileServiceTimeGetAllRepository.apiProfileServiceTimeGetAllPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.GetAllTimeSlotsForTimePeriodResponse.decode(apiData.data);
            console.log('🚀 ~ file: index.js ~ line 115 ~ registerMutation ~ decodedData', decodedData);
            setData(decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });

    const fetchApi = async (data, time) => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            startTime: {
                time: time.startTime,
            },
            endTime: {
                time: time.endTime,
            },
            serviceProfileId: {
                value: data.profile.id.value,
            },
        };
        const verify = decoder.alopal.backend.services.GetAllTimeSlotsForTimePeriodRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.GetAllTimeSlotsForTimePeriodRequest.encode(verify).finish();
        const datacv = await getTimeSlots.mutateAsync(encodedData);
    };

    const sendMessageApi =  useMutation((user) => ApiMessageSendRepository.apiMessageSendPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.sendMessageResponse.decode(apiData.data);
            console.log('🚀 ~ file: index.js ~ line 115 ~ registerMutation ~ decodedData', decodedData);
            setData(decodedData);
        },
        onError: (error) => {
        console.log("🚀 ~ file: index.js ~ line 159 ~ sendMessageApi ~ error", error)
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });

    const sendMessages = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            message: {
                content: 'test2tstestetstest222312312312313',
                receiverUserId: {
                    value: 1,
                },
                senderUserId: {
                    value: 2 ,
                },
                title: 'testtt222',
            },
        };
        const verify = decoder.alopal.backend.sendMessageRequest.create(dataWithContext);
        console.log("🚀 ~ file: index.js ~ line 184 ~ sendMessages ~ verify", verify)
        const encodedData = decoder.alopal.backend.sendMessageRequest.encode(verify).finish();
        const datacv = await sendMessageApi.mutateAsync(encodedData);
    };

    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
        if (!value) {
            return <PickersDay {...pickersDayProps} />;
        }

        let status = false;
        const slotStatus = userServiceProfile?.timeSlots?.map((item) => {
            const start = new Date(item.startTime.time).setHours(0, 0, 0, 0);
            const end = new Date(item.endTime.time);
            const startValue = new Date(start).setHours(0, 0, 0, 0);
            const endValue = new Date(end).setHours(0, 0, 0, 0);
            status = (new Date(startValue).getTime() === new Date(date).getTime()) || (new Date(endValue).getTime() === new Date(date).getTime());
            return status;
        });
        return (
            <PickersDay
                {...pickersDayProps}
                disableMargin
                className={clsx({
                    [classes.highlight]: Array.isArray(slotStatus) && slotStatus.includes(true),
                })}
            />
        );
    };

    const onMonthChange = (date) => {
        console.log(dayjs(date).format(), 'date');
        const time = {
            startTime: dayjs(new Date(new Date(date).getFullYear(),
                new Date(date).getMonth(),
                new Date(date).getDate())).format(),
            endTime: dayjs(new Date(new Date(date).getFullYear(),
                new Date(date).getMonth() + 1,
                new Date(date).getDate())).format(),
        };
        fetchApi(serviceData, time);
    };

    useEffect(() => {
        if (tokenStatus?.token?.token) {
            fetchUserData();
            sendMessages();
        }
    }, [tokenStatus.token]);

    return (
        <Paper elevation={1} className={classes.root}>
            <PageTitle>
                <FormattedMessage id="pal.dateManagement" />
            </PageTitle>
            <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Box fontSize={18} fontWeight={600}>
                    <FormattedMessage id="pal.dateManagement.allocatedTime" values={{ value: 120 }} />
                </Box>
                <Link href="/dashboards/PAL/sessions-and-courses/date-management/allocation">
                    <Button color="primary" variant="contained">
                        <FormattedMessage id="pal.dateManagement.allocatedTime.button" />
                    </Button>
                </Link>
            </Box>
            <Box display="flex" marginTop={2}>
                <Box>
                    <Render condition={userSetting.direction === 'rtl'}>
                        <LocalizationProvider dateAdapter={JalaliUtils}>
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                open
                                // openTo="day"
                                label="Basic example"
                                // shouldDisableDate={shouldDisableDate}
                                value={new Date(date)}
                                onChange={(newValue) => {
                                    dateSelector(dayjs(newValue).format());
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                // inputFormat="yyyy/MM/dd"
                                onMonthChange={onMonthChange}
                                renderDay={renderWeekPickerDay}
                                minDate={new Date()}
                            />
                        </LocalizationProvider>
                    </Render>
                    <Render condition={userSetting.direction !== 'rtl'}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                open
                                // openTo="day"
                                label="Basic example"
                                // shouldDisableDate={shouldDisableDate}
                                value={new Date(date)}
                                onChange={(newValue) => {
                                    dateSelector(dayjs(newValue).format());
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                // inputFormat="yyyy/MM/dd"
                                onMonthChange={onMonthChange}
                                renderDay={renderWeekPickerDay}
                                minDate={new Date()}
                            />
                        </LocalizationProvider>

                    </Render>
                </Box>
                <Box display="flex" flexDirection="column" alignSelf="stretch" className={classes.test}>
                    <Box fontWeight={700} fontSize={24}>
                        {getFullDay(date)}
                    </Box>
                    <Box fontWeight={700} fontSize={24}>
                        8 hours
                    </Box>
                    <Box>
                        <List component="nav" aria-label="contacts">
                            {
                                visibleHours.map((item) => (
                                    <ListItem button>
                                        <ListItemIcon>
                                            <TimerIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`${getHourMinutes(item.startTime.time)} - ${getHourMinutes(item.endTime.time)}`} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}

DateManagment.propTypes = {

};

export default DateManagment;
