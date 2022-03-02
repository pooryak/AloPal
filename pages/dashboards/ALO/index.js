import {
    Avatar, Box, Paper, Grid, Typography,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { SessionsCard, ProfileCard, Authentication } from 'src/components';
import { useMutation } from 'react-query';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { ApiProfileBaseCurrentRepository } from 'repository';
import { useToken } from 'src/utility/hooks';
import { useTheme } from '@material-ui/core/styles';
import decoder from 'compiled';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: theme.spacing(),
        [theme.breakpoints.down('sm')]: {
            [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: 0,
        },
        padding: theme.spacing(0, 1),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        [`padding${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: theme.spacing(5),
    },
    header_container: {
        padding: theme.spacing(),
        paddingTop: 0,
    },
    title: {
        color: theme.palette.aloPal.dark,
    },
    cardContainer: {
        marginTop: theme.spacing(1),
    },
    cta: {
        cursor: 'pointer',
        marginLeft: theme.spacing(),
        color: theme.palette.secondary.main,
        transition: 'color 1s',
    },
    cta_text: {
        color: theme.palette.aloPal.blue,
        cursor: 'pointer',
        transition: theme.transitions.create('color'),
        '&:hover': {
            color: theme.palette.secondary.main,
        },
    },
    description: {
        '& $span': {
            fontSize: '3rem',
            fontWeight: 700,
            color: theme.palette.aloPal.blue,
        },
        fontSize: '1.1rem',
        color: theme.palette.primary.main,
        fontWeight: 700,
        transition: 'color 1s',
        lineHeight: 1.1,
    },
    card: {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(1),
        padding: theme.spacing(4.1, 3.8),
        borderRadius: theme.spacing(1.1),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        transition: 'color 1s',
        '&:hover': {
            background: 'linear-gradient(105.7deg, #115169 4.45%, #17A5E1 106.92%, rgba(9, 185, 251, 0) 106.93%)',
            color: theme.palette.common.white,
            cursor: 'pointer',
        },
        '&:hover $cta,&:hover $cta_text,&:hover $description ,&:hover $description $span': {
            color: theme.palette.common.white,
        },
        // height: '100%',
    },
    balanceBox: {
        padding: theme.spacing(2, 2),
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 20,
    },
    avatar: {
        [`margin${theme.direction.direction === 'rtl' ? 'Left' : 'Right'}`]: theme.spacing(1),
    },
    cards_title: {
        fontWeight: 700,
        color: theme.palette.primary.main,
        fontSize: '2rem',
        [`padding${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: theme.spacing(),
        paddingBottom: theme.spacing(),
    },
    comma: {
        color: theme.palette.secondary.main,
    },
    subtitle: {
        color: theme.palette.aloPal.shades[6],
        fontSize: theme.typography.pxToRem(12),
        fontFamily: 'Roboto',
    },
    subtitleCaption: {
        color: theme.palette.aloPal.shades[6],
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: theme.typography.pxToRem(18),
    },
}));

const people = [
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '40.0',
        duration: '50 Minutes',
        sessions: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 1,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '40.0',
        duration: '50 Minutes',
        sessions: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 2,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '40.0',
        duration: '50 Minutes',
        sessions: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 3,
    },

];

const data = [
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 1,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 2,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 3,
    },

];

function Dashboard(props) {
    const tokenStatus = useToken();
    const theme = useTheme();
    const classes = useStyle();
    const [userData, setUserData] = useState();
    const registerMutation = useMutation((user) => ApiProfileBaseCurrentRepository.apiProfileBaseCurrentPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.GetBaseProfileResponse.decode(apiData.data);
            setUserData(decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
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
        const verify = decoder.alopal.backend.services.GetBaseProfileRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.GetBaseProfileRequest.encode(verify).finish();
        const datacv = await registerMutation.mutateAsync(encodedData);
    };
    useEffect(() => {
        if (tokenStatus?.token?.token) {
            fetchApi();
        }
    }, [tokenStatus.token]);
    const today = new Date();
    const currentHour = today.getHours();
    let greetingTxt;
    switch (true) {
        case currentHour <= 12:
            greetingTxt = <FormattedMessage id="general.morning" />;
            break;
        case currentHour <= 18:
            greetingTxt = <FormattedMessage id="general.afternoon" />;
            break;
        case currentHour > 18:
            greetingTxt = <FormattedMessage id="general.evening" />;
            break;
        default:
            greetingTxt = <FormattedMessage id="general.evening" />;
    }
    return (
        <Authentication>
            <div className={classes.root}>
                <Box display="flex" justifyContent="space-between" alignContent="center" className={classes.header_container}>
                    <Grid xs={6}>
                        <Box fontSize="36px" fontWeight={700} className={classes.title}>
                            {greetingTxt}
                            <span className={classes.comma}>,</span>
                            {' '}
                            {' '}
                            {userData?.profile?.privateInformation?.identification?.firstName}
                        </Box>
                        <Box className={classes.subtitle}>
                            <FormattedMessage id="dashboard.alo.subtitle" />
                        </Box>
                    </Grid>
                    <Grid xs={5}>
                        <Box display="flex" justifyContent="space-between" className={classes.balanceBox} alignItems="center">
                            <Box fontWeight={700} fontSize={18} mr={2}>
                                <FormattedMessage
                                    id="user.titleBalance"
                                />

                            </Box>
                            <Box fontWeight={700} fontSize={24} ml={1}>
                                <Typography color="secondary" component="span" fontSize={24}>
                                    $
                                </Typography>
                                <FormattedNumber value={125.0} />
                            </Box>
                            <Box
                                justifyContent="flex-end"
                                fontSize={16}
                                alignItems="center"
                                display="flex"
                                marginLeft="auto"
                                className={classes.cta}
                            >
                                {/* <FormattedMessage
                                id="user.balanceHistory"
                            /> */}
                                {' '}
                                {theme.direction.direction === 'rtl' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
                            </Box>
                        </Box>
                    </Grid>
                </Box>
                <Grid display="flex" justifyContent="space-between" className={classes.cardContainer}>
                    <Grid sm={5} xs={12} display="flex" alignItems="stretch">
                        <Paper elevation={0} className={classes.card}>
                            <Box
                                justifyContent="flex-end"
                                fontSize={12}
                                alignItems="center"
                                display="flex"
                                className={classes.cta_text}
                            >
                                <FormattedMessage id="user.sessions" />
                                {' '}
                                {theme.direction.direction === 'rtl'
                                    ? <ArrowBackIosIcon className={classes.cta} />
                                    : <ArrowForwardIosIcon className={classes.cta} />}
                            </Box>
                            <Box fontWeight={500} marginTop={0.5} className={classes.description}>
                                <FormattedMessage
                                    id="user.numberSessions"
                                    values={{
                                        number: <span>2</span>,
                                        linebreak: <br />,
                                    }}
                                />

                            </Box>
                            <Box marginTop={2}>
                                <Avatar />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid display="flex" alignItems="stretch" sm={7}>
                        <Paper elevation={0} className={classes.card}>
                            <Box
                                justifyContent="flex-end"
                                fontSize={12}
                                alignItems="center"
                                display="flex"
                                className={classes.cta_text}
                            >
                                <FormattedMessage id="user.fullMessages" />

                                {' '}
                                {theme.direction.direction === 'rtl'
                                    ? <ArrowBackIosIcon className={classes.cta} />
                                    : <ArrowForwardIosIcon className={classes.cta} />}
                            </Box>
                            <Box fontWeight={500} marginTop={0.5} className={classes.description}>
                                <FormattedMessage
                                    id="user.numberMessages"
                                    values={{
                                        number: <span>24</span>,
                                        linebreak: <br />,
                                    }}
                                />
                            </Box>
                            <Box marginTop={2} display="flex">
                                <Avatar className={classes.avatar} />
                                <Typography variant="caption" fontFamily="roboto">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                    . Pellentesque auctor placerat suscipit. Etiam efficitur, dolor porttitor sollicitudin.
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Box mt={2} mb={2} className={classes.cards_title}>
                    <FormattedMessage
                        id="user.titlePals"
                    />
                </Box>
                <Grid container direction="row" justifyContent="space-between">
                    {
                        people.map((item) => <SessionsCard xs="100%" sm="30%" key={item.id} data={item} />)
                    }
                </Grid>
                <Box marginTop={2} className={classes.cards_title}>
                    <Typography variant="caption" className={classes.subtitleCaption}>
                        <FormattedMessage
                            id="user.missCaption"
                        />
                    </Typography>
                    <Box>
                        <FormattedMessage
                            id="user.populatTitle"
                        />
                    </Box>
                </Box>
                <Grid container direction="row" justifyContent="space-between">
                    {
                        data.map((item) => <ProfileCard xs="100%" sm="30%" key={item.id} data={item} />)
                    }
                </Grid>
            </div>
        </Authentication>
    );
}

Dashboard.propTypes = {

};

export default Dashboard;
