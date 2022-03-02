import { useState, useEffect } from 'react';
import {
    Paper, Box, Button, SvgIcon, Modal,
} from '@material-ui/core';
import { SessionsLinearCard } from 'src/components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ModalBody } from 'src/widgets';
import { useToken } from 'src/utility/hooks';
// import AddToCalendar from '@culturehq/add-to-calendar';
import { useMutation } from 'react-query';
import { ApiMeetingListActiveRepository, ApiProfileServiceGetAllRepository } from 'repository';
import { makeStyles } from '@material-ui/styles';
import decoder from 'compiled.js';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(7),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
        padding: theme.spacing(6, 5),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    main: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    subtitle: {
        fontSize: theme.typography.pxToRem(18),
        color: theme.palette.grey[600],
    },
}));

const upcomingData = [{
    name: 'Jhon Smith',
    description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
    date: 'Tue 2020/06/12',
    duration: 60,
    id: 0,

}, {
    name: 'Jhon Smith',
    description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
    date: 'Tue 2020/06/12',
    duration: 60,
    id: 1,

}, {
    name: 'Jhon Smith',
    description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
    date: 'Tue 2020/06/12',
    duration: 60,
    id: 2,

}];
const historyData = [{
    name: 'Jhon Smith',
    description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
    date: 'Tue 2020/06/12',
    duration: 60,
    history: 1,
    id: 0,

}, {
    name: 'Jhon Smith',
    description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
    date: 'Tue 2020/06/12',
    duration: 60,
    history: 2,
    id: 1,

}, {
    name: 'Jhon Smith',
    description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
    date: 'Tue 2020/06/12',
    duration: 60,
    history: 2,
    id: 2,

}];

const event = {
    name: 'Happy Hour',
    details: "Let's go after work",
    location: 'Boston, MA',
    startsAt: '2018-12-06T17:00:00-05:00',
    endsAt: '2018-12-06T18:00:00-05:00',
};

function SessionsAndCourses(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const tokenStatus = useToken();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const registerMutation = useMutation((user) => ApiMeetingListActiveRepository.apiMeetingListActivePost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.ListActiveMeetingResponse.decode(apiData.data);
            console.log('🚀 ~ file: index.js ~ line 115 ~ registerMutation ~ decodedData', decodedData);
            // setData(decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });

    const getServicesApi = useMutation((user) => ApiProfileServiceGetAllRepository.apiProfileServiceGetAllPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.GetAllServiceProfileResponse.decode(apiData.data);
            console.log('🚀 ~ file: index.js ~ line 115 ~ registerMutation ~ decodedData', decodedData);
            // setData(decodedData);
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
        const verify = decoder.alopal.backend.services.ListActiveMeetingRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.ListActiveMeetingRequest.encode(verify).finish();
        const datacv = await registerMutation.mutateAsync(encodedData);
    };
    const getAllServices = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
        };
        const verify = decoder.alopal.backend.services.GetAllServiceProfileRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.GetAllServiceProfileRequest.encode(verify).finish();
        await getServicesApi.mutateAsync(encodedData);
    };
    useEffect(() => {
        if (tokenStatus?.token?.token) {
            fetchApi();
            // getAllServices();
            // const s = ApiProfileServiceGetAllRepository.apiProfileServiceGetAllPost(encodedData)
            // console.log("🚀 ~ file: index.js ~ line 121 ~ useEffect ~ s", s)
        }
    }, [tokenStatus.token]);
    return (
        <Paper elevation={1} className={classes.root}>
            {/* <AddToCalendar event={event} /> */}
            <Box fontWeight={700} fontSize={24} color="aloPal.dark">
                <FormattedMessage id="user.sessions.title" />
            </Box>
            <Box marginTop={1} className={classes.subtitle}>
                <FormattedMessage id="user.sessions.schedule" />
            </Box>
            <Box display="flex" flexDirection="column" marginTop={2} padding={[2, 1]}>
                {upcomingData.map((item) => (
                    <SessionsLinearCard
                        data={item}
                        key={item.id}
                        handleCancel={handleOpen}
                    />
                ))}
            </Box>
            <Box marginTop={2} marginBottom={2} fontSize={24} fontWeight={600}>
                <FormattedMessage id="user.sessions.history" />
            </Box>
            <Box display="flex" flexDirection="column" marginTop={2} padding={[2, 1]}>
                {historyData.map((item) => <SessionsLinearCard data={item} key={item.id} />)}
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ModalBody handleClose={handleClose} />
            </Modal>
        </Paper>
    );
}

SessionsAndCourses.propTypes = {

};

export default SessionsAndCourses;
