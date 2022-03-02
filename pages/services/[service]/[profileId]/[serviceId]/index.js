import { useState, useEffect, useContext } from 'react';
import {
    Container, TabPanel, UserContext,
} from 'src/components';
import {
    Grid, Typography, Box, Button,
    Avatar, Tabs, Tab, FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Carousel } from 'react-responsive-carousel';
import { useMutation } from 'react-query';
import { DateTimePicker, CarouselBanner } from 'src/widgets';
import { getFullDayAdDate } from 'src/utility/date';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useToken } from 'src/utility/hooks';
import jMoment from 'moment-jalaali';

import { makeStyles } from '@material-ui/styles';
import {
    ApiMeetingBookRepository,
    ApiMeetingListActiveRepository,
    ApiMeetingTypeAddRepository,
    ApiProfileBaseCurrentRepository,
    ApiMeetingTypeListRepository,
    ApiProfileServiceTimeGetAvailableRepository,
    ApiProfileBaseOneRepository,
} from 'repository';
import decoder from 'compiled.js';

console.log('🚀 ~ file: index.js ~ line 15 ~ decoder', decoder);

const useStyles = makeStyles((theme) => ({
    widget: {
        alignSelf: 'stretch',
        borderRadius: '5px',
        backgroundColor: theme.palette.thirdinary[300],
        padding: theme.spacing(2, 1),
    },
    main: {
        padding: theme.spacing(2, 1),
    },
    text: {
        textAlign: 'center',
    },
    price_box: {
        margin: theme.spacing(1),
        backgroundColor: 'white',
        padding: theme.spacing(2, 1),
        borderRadius: '5px',
    },
    session_text: {
        fontWeight: 500,
        margin: theme.spacing(2, 0),
        textAlign: 'center',
    },
    datePicker: {
        minWidth: 'none',
        width: '90%',
        position: 'relative',
        // padding: theme.spacing(10, 2),
        // position: 'absolute',
    },
    description: {
        margin: theme.spacing(2, 0),
        display: 'block',
    },
    img: {
        width: '86px',
        height: '86px',
    },

}));

const items = [
    {
        Name: 'Electronics',
        Caption: 'Electrify your friends!',
        contentPosition: 'left',
        Items: [
            {
                Name: 'Macbook Pro',
                Image: 'https://source.unsplash.com/featured/?macbook',
            },
            {
                Name: 'iPhone',
                Image: 'https://source.unsplash.com/featured/?iphone',
            },
        ],
    },
    {
        Name: 'Home Appliances',
        Caption: 'Say no to manual home labour!',
        contentPosition: 'middle',
        Items: [
            {
                Name: 'Washing Machine WX9102',
                Image: 'https://source.unsplash.com/featured/?washingmachine',
            },
            {
                Name: 'Learus Vacuum Cleaner',
                Image: 'https://source.unsplash.com/featured/?vacuum,cleaner',
            },
        ],
    },
    {
        Name: 'Decoratives',
        Caption: 'Give style and color to your living room!',
        contentPosition: 'right',
        Items: [
            {
                Name: 'Living Room Lamp',
                Image: 'https://source.unsplash.com/featured/?lamp',
            },
            {
                Name: 'Floral Vase',
                Image: 'https://source.unsplash.com/featured/?vase',
            },
        ],
    },
];
jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
function Pal(props) {
    const classes = useStyles();
    const tokenStatus = useToken();
    const router = useRouter();
    const userSetting = useContext(UserContext);
    const [palData, setPalData] = useState();
    console.log('🚀 ~ file: index.js ~ line 131 ~ Pal ~ palData', palData);
    const [selectedDate, dateChanger] = useState(new Date());
    const [visibleHours, setVisibleHours] = useState([]);
    const [activeMeetings, setActiveMeetings] = useState();
    const [finalSlots, setFinalSlots] = useState([]);
    const [selectedSlot, setSlot] = useState();
    const [reservedTimes, setReservedTimes] = useState();

    const getSlotTimes = (date) => {
        const selectedTime = new Date(date).setHours(0, 0, 0, 0);
        console.log('🚀 ~ file: index.js ~ line 71 ~ dateSelector ~ selectedTime', selectedTime);
        const selectedSlots = reservedTimes?.timeSlots.filter((item) => {
            const start = new Date(item.startTime.time).setHours(0, 0, 0, 0);
            console.log('🚀 ~ file: index.js ~ line 74 ~ selectedSlots ~ start', start);
            if (start === selectedTime) {
                return item;
            }
            return null;
        });
        setVisibleHours(selectedSlots);
    };

    const handleDateChange = (date) => {
        dateChanger(date);
        getSlotTimes(date);
    };

    const setSelectedSlot = (date) => {
        console.log('🚀 ~ file: index.js ~ line 142 ~ setSelectedSlot ~ id', date);
        const selectedDate = new Date(date.startTime.time);
        console.log('🚀 ~ file: index.js ~ line 159 ~ setSelectedSlot ~ selectedDate', selectedDate);
        const nextWeek = selectedDate.setDate(selectedDate.getDate() + parseInt(7));
        const twoNextWeek = selectedDate.setDate(selectedDate.getDate() + parseInt(7));
        console.log('🚀 ~ file: index.js ~ line 163 ~ setSelectedSlot ~ twoNextWeek', new Date(twoNextWeek));
        const selectedSlots = reservedTimes?.timeSlots.filter((item) => {
            const start = new Date(item.startTime.time);
            console.log('🚀 ~ file: index.js ~ line 74 ~ selectedSlots ~ start', start);
            if (new Date(start).getTime() === new Date(nextWeek).getTime()
            || new Date(start).getTime() === new Date(twoNextWeek).getTime()) {
                return item;
            }
            return null;
        });
        console.log('🚀 ~ file: index.js ~ line 169 ~ selectedSlots ~ selectedSlots', selectedSlots);
        console.log(new Date(nextWeek), 'nextweek');
        selectedSlots.push(date);
        console.log('🚀 ~ file: index.js ~ line 175 ~ setSelectedSlot ~ allSlots', selectedSlots);
        const slotsAdCheck = selectedSlots.map((item) => ({ ...item, checked: true }));
        console.log('🚀 ~ file: index.js ~ line 177 ~ setSelectedSlot ~ slotsAdCheck', slotsAdCheck);
        setFinalSlots(slotsAdCheck);
        setSlot(date);
    };

    const getAllTimes = useMutation((user) => ApiProfileServiceTimeGetAvailableRepository.apiProfileServiceTimeGetAvailablePost(user), {
        onSuccess: (data) => {
            // console.log('🚀 ~ file: index.js ~ line 182 ~ setSelectedSlot ~ selectedSlots', selectedSlots);
            const decodedData = decoder.alopal.backend.services.GetAvailableTimeSlotsForTimePeriodResponse.decode(data.data);
            console.log('🚀 ~ file: index.js ~ line 148 ~ getAllTimes ~ decodedData', decodedData);
            setReservedTimes(decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
        },
    });

    const getTimes = async (date) => {
        console.log('🚀 ~ file: index.js ~ line 197 ~ getTimes ~ date', date);
        const endOfDay = dayjs(date.endTime).endOf('day').format();
        console.log('🚀 ~ file: index.js ~ line 209 ~ getTimes ~ endOfDay', endOfDay);
        const startOfDay = dayjs(date.startTime).startOf('day').format();
        console.log('🚀 ~ file: index.js ~ line 210 ~ getTimes ~ startOfDay', startOfDay);
        // const endOfDay = dayjs(selectedDate).endOf('month').format();
        const data = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            endTime: {
                time: date.endTime,
                // time: '2021-05-27T17:40:00.000Z',
            },
            startTime: {
                time: date.startTime,
                // time: '2021-05-20T17:40:00.000Z',
            },
            serviceProfileId: {
                value: 3,
            },
        };
        const verify = decoder.alopal.backend.services.GetAvailableTimeSlotsForTimePeriodRequest.create(data);
        const encodedData = decoder.alopal.backend.services.GetAvailableTimeSlotsForTimePeriodRequest.encode(verify).finish();
        const datacv = await getAllTimes.mutateAsync(encodedData);
    };

    const onMonthChange = (date) => {
        const time = {
            startTime: dayjs(new Date(new Date(date).getFullYear(),
                new Date(date).getMonth(),
                new Date(date).getDate())).format(),
            endTime: dayjs(new Date(new Date(date).getFullYear(),
                new Date(date).getMonth() + 1,
                new Date(date).getDate())).format(),
        };
        getTimes(time);
    };

    const geActiveMeetingApi = useMutation((user) => ApiMeetingTypeListRepository.apiMeetingTypeListPost(user), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.ListActiveMeetingTypesForServiceResponse.decode(data.data);
            setActiveMeetings(decodedData);
            console.log('🚀 ~ file: index.js ~ line 228 ~ createServiceType ~ decodedData', decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
        },
    });

    const bookMeetingApi = useMutation((user) => ApiMeetingBookRepository.apiMeetingBookPost(user), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.BookAMeetingResponse.decode(data.data);
            // setActiveMeetings(decodedData);
            console.log('🚀 ~ file: index.js ~ line 228 ~ createServiceType ~ decodedData', decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
        },
    });

    const getActiveMeetings = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            serviceId: {
                value: 1,
            },
        };
        const verify = decoder.alopal.backend.services.ListActiveMeetingTypesForServiceRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.ListActiveMeetingTypesForServiceRequest.encode(verify).finish();
        const datacv = await geActiveMeetingApi.mutateAsync(encodedData);
    };

    const geActiveMeetingApis = useMutation((user) => ApiMeetingListActiveRepository.apiMeetingListActivePost(user), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.ListActiveMeetingResponse.decode(data.data);
            // setActiveMeetings(decodedData);
            console.log('🚀 ~ file: index.js ~ line 228 ~ createServiceType ~ decodedData', decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
        },
    });

    const getActiveMeetingsOrginal = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
        };
        const verify = decoder.alopal.backend.services.ListActiveMeetingRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.ListActiveMeetingRequest.encode(verify).finish();
        const datacv = await geActiveMeetingApis.mutateAsync(encodedData);
    };

    const getPalData = useMutation((user) => ApiProfileBaseOneRepository.apiProfileBaseOnePost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.GetBaseProfileResponse.decode(apiData.data);
            setPalData(decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });

    const fetchBaseProfile = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            profileId: Number(router.query.id),
        };
        const verify = decoder.alopal.backend.services.GetProfileByIdRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.GetProfileByIdRequest.encode(verify).finish();
        const datacv = await getPalData.mutateAsync(encodedData);
    };

    const handleCheckBox = (e, index) => {
        const newData = [...finalSlots];
        newData[index] = { ...newData[index], checked: e.target.checked };
        console.log('🚀 ~ file: index.js ~ line 324 ~ handleCheckBox ~ newData', newData);
        setFinalSlots(newData);
        // console.log("🚀 ~ file: index.js ~ line 325 ~ handleCheckBox ~ e", e.)
    };

    useEffect(() => {
        const time = {
            startTime: dayjs(new Date(new Date().getFullYear(),
                new Date().getMonth() - 1,
                new Date().getDate())).format(),
            endTime: dayjs(new Date(new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate())).format(),
        };
        console.log('🚀 ~ file: index.js ~ line 341 ~ useEffect ~ time', time);
        if (tokenStatus?.token?.token) {
            fetchBaseProfile();
            getTimes(time);
            getActiveMeetingsOrginal();
            getActiveMeetings();
        }
    }, [tokenStatus.token]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const bookSession = async () => {
        const timeSlotsIds = activeMeetings.meetingTypes.map((item) => item.id.value);
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            meeting: {
                meetingTime: {
                    timeSlotIds: [selectedSlot.id.value],
                },
                meetingType:
                    activeMeetings.meetingTypes[0],
                meetingTypeId: {
                    value: activeMeetings.meetingTypes[0].id.value,
                },
                professionProfileId: {
                    value: 1,
                },
                userProfileId: {
                    value: 1,
                },
            },
        };
        console.log('🚀 ~ file: index.js ~ line 347 ~ bookSession ~ dataWithContext', dataWithContext);
        const verify = decoder.alopal.backend.services.BookAMeetingRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.BookAMeetingRequest.encode(verify).finish();
        const datacv = await bookMeetingApi.mutateAsync(encodedData);
    };
    // console.log(activeMeetings, 'activeMeetings');

    // console.log('🚀 ~ file: index.js ~ line 127 ~ Pal ~ selectedSlot', finalSlots);
    return (
        <Container>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} sm={4} className={classes.widget}>
                    <Typography variant="h6" component="h3" className={classes.text}>
                        <FormattedMessage id="pal.widget.title" />
                    </Typography>
                    <Box justifyContent="space-between" display="flex" className={classes.price_box}>
                        <span>
                            <FormattedNumber
                                value={activeMeetings?.meetingTypes[0].sessionPrice.amount}
                                format={activeMeetings?.meetingTypes[0].sessionPrice.ISOType}
                            />
                        </span>
                        <span>
                            <FormattedMessage
                                id="general.durationMinutes"
                                values={{ value: activeMeetings?.meetingTypes[0].meetingLengthInMinutes }}
                            />
                        </span>
                    </Box>
                    <Typography component="h5" className={classes.session_text}>
                        <FormattedMessage id="pal.widget.select" />
                    </Typography>
                    <div className={classes.datePicker}>
                        <DateTimePicker
                            userSetting={userSetting}
                            reservedTimes={reservedTimes}
                            selectedDate={selectedDate}
                            handleDateChange={handleDateChange}
                            setSelectedSlot={setSelectedSlot}
                            onMonthChange={onMonthChange}
                            visibleHours={visibleHours}
                        />
                    </div>
                    <Box display="flex" flexDirection="column" marginBottom={2}>
                        {
                            finalSlots.map((item, index) => (
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            checked={item.checked}
                                            onChange={(e) => handleCheckBox(e, index)}
                                            name={getFullDayAdDate(item.startTime.time) || 'test'}
                                        />
                                    )}
                                    label={getFullDayAdDate(item.startTime.time) || 'test'}
                                />
                            ))
                        }

                    </Box>
                    <Typography variant="caption" className={classes.description}>
                        <FormattedMessage id="pal.widget.description" />
                    </Typography>
                    <Box justifyContent="space-between" display="flex" className={classes.price_box}>
                        <span>
                            <FormattedNumber
                                value={activeMeetings?.meetingTypes[0].sessionPrice.amount * finalSlots.length}
                                format={activeMeetings?.meetingTypes[0].sessionPrice.ISOType}
                            />
                        </span>
                        <span>
                            <FormattedMessage
                                id="general.NumberofSession"
                                values={{ value: finalSlots.length }}
                            />
                        </span>
                    </Box>
                    <Box justifyContent="center" display="flex">
                        <Button variant="outlined" size="large" color="primary" onClick={bookSession}>
                            BOOK A SESSION
                        </Button>
                    </Box>
                    <Typography variant="caption" className={classes.description}>
                        Video call or Audio call
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} className={classes.main}>
                    <Carousel
                        autoPlay

                    >
                        {
                            items.map((item, index) => <CarouselBanner size={400} item={item} key={index} contentPosition={item.contentPosition} />)
                        }
                    </Carousel>
                    <Box display="flex">
                        <Box>
                            <Avatar className={classes.img} src="/assets/image/avatar4.55833b54.svg" />
                        </Box>
                        <Box marginLeft={2} alignContent="space-between">
                            <Typography variant="h3">
                                {`${palData?.profile?.privateInformation?.identification?.firstName} 
                                ${palData?.profile.privateInformation?.identification?.lastName}`}
                            </Typography>
                            <Typography variant="caption">
                                Psychiatrists
                            </Typography>
                        </Box>
                    </Box>
                    <Box marginTop={2}>
                        <Tabs value={value} onChange={handleChange} aria-label="ant example">
                            <Tab label="About Pal" />
                            <Tab label="Approach" />
                            <Tab label="Certificates & Awards" />
                            <Tab label="Verified Clients Reviews" />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor
                            placerat suscipit. Etiam efficitur, dolor porttitor sollicitudin sodales,
                            nulla enim tincidunt odio, in ultrices nisi mi sagittis orci. Etiam mattis
                            nulla metus. Morbi eget rhoncus nisi, nec consectetur urna. Nulla facilisi.
                            Etiam tincidunt luctus facilisis. Interdum et malesuada fames ac ante ipsum primis
                            in faucibus. Vestibulum varius velit ligula, vel ultricies dui laoreet id.
                            Ut suscipit convallis accumsan. Proin commodo dolor lobortis, rutrum tortor vitae,
                            tempus lorem. Proin vitae tellus velit. Donec consectetur mi diam,
                            vel finibus mauris efficitur sit amet.

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor placerat
                            suscipit. Etiam efficitur, dolor porttitor sollicitudin sodales, nulla enim tincidunt
                            odio, in ultrices nisi mi sagittis orci. Etiam mattis nulla metus. Morbi eget rhoncus
                            nisi, nec consectetur urna. Nulla facilisi.

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor placerat
                            suscipit. Etiam efficitur, dolor porttitor sollicitudin sodales, nulla enim tincidunt
                            odio, in ultrices nisi mi sagittis orci. Etiam mattis nulla metus. Morbi eget rhoncus
                            nisi, nec consectetur urna. Nulla facilisi. Etiam tincidunt luctus facilisis.
                            Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum varius
                            velit ligula, vel ultricies dui laoreet id. Ut suscipit convallis accumsan. Proin
                            commodo dolor lobortis, rutrum tortor vitae, tempus amet.
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

Pal.propTypes = {

};

export default Pal;
