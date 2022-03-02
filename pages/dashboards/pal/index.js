import {
    Avatar, Box, Paper, Grid, Typography, Button,
} from '@material-ui/core';
import { SessionsCard, Authentication, Container } from 'src/components';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { useMutation } from 'react-query';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PropTypes from 'prop-types';
import { useToken } from 'src/utility/hooks';
import { useTheme } from '@material-ui/core/styles';
import { ApiProfileBaseCurrentRepository } from 'repository';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import decoder from 'compiled';

const useStyle = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
        padding: theme.spacing(0, 1),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingLeft: theme.spacing(5),
    },
    header_container: {
        padding: theme.spacing(),
    },
    title: {
        color: theme.palette.primary.light,
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
        color: theme.palette.primary.light,
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
            color: theme.palette.primary.light,
        },
        fontSize: '1.1rem',
        color: theme.palette.primary.main,
        fontWeight: 700,
        transition: 'color 1s',
    },
    card: {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(1),
        padding: theme.spacing(2, 2),
        borderRadius: theme.spacing(1.1),
        transition: 'color 1s',
        '&:hover': {
            background: 'linear-gradient(105.7deg, #115169 4.45%, #17A5E1 106.92%, rgba(9, 185, 251, 0) 106.93%)',
            color: theme.palette.common.white,
            cursor: 'pointer',
        },
        '&:hover $cta,&:hover $cta_text,&:hover $description ,&:hover $description $span': {
            color: theme.palette.common.white,
        },
    },
    balanceBox: {
        padding: theme.spacing(2, 2),
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(6),
    },
    avatar: {
        marginRight: theme.spacing(1),
    },
    cards_title: {
        fontWeight: 700,
        color: theme.palette.primary.main,
        fontSize: '2rem',
        paddingLeft: theme.spacing(),
        paddingBottom: theme.spacing(),
    },
    comma: {
        color: theme.palette.secondary.main,
    },
}));

const people = [
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        sessions: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 1,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        sessions: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 2,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        sessions: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 3,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        sessions: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 4,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        sessions: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 5,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        sessions: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 6,
    },

];

function Pal(props) {
    const classes = useStyle();
    const theme = useTheme();
    const tokenStatus = useToken();
    const [userData, setUserData] = useState();
    console.log('🚀 ~ file: index.js ~ line 115 ~ Pal ~ userData', userData);
    const registerMutation = useMutation((user) => ApiProfileBaseCurrentRepository.apiProfileBaseCurrentPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.GetBaseProfileResponse.decode(apiData.data);
            setUserData(decodedData);
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
    console.log('🚀 ~ file: index.js ~ line 145 ~ Dashboard ~ currentHour', currentHour);
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
                    <Box fontSize="36px" fontWeight={700} className={classes.title}>
                        {greetingTxt}
                        {' '}
                        {' '}
                        {userData?.profile?.privateInformation?.identification?.firstName}
                    </Box>
                    <Box display="flex" marginTop={1} className={classes.balanceBox} alignItems="center">
                        <Box fontWeight={700} fontSize={18} mr={2}>
                            <FormattedMessage
                                id="user.titleBalance"
                            />

                        </Box>
                        <Box fontWeight={700} fontSize={22} marginLeft={1}>
                            <FormattedNumber value={125} style="currency" currency="USD" />
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
                </Box>

                <Grid container className={classes.cardContainer}>
                    <Grid item sm={4} xs={12}>
                        <Paper elevation={0} className={classes.card}>
                            <Box
                                justifyContent="flex-end"
                                fontSize={16}
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
                            <Box fontWeight={500} marginTop={2} className={classes.description}>
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
                    <Grid item sm={8}>
                        <Paper elevation={0} className={classes.card}>
                            <Box
                                justifyContent="flex-end"
                                fontSize={16}
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
                            <Box fontWeight={500} marginTop={2} className={classes.description}>
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
                <Box fontWeight={500} fontSize={16} marginTop={2}>
                    <FormattedMessage
                        id="pal.titleAlos"
                    />
                </Box>
                <Grid container direction="row">
                    {
                        people.map((item) => <SessionsCard xs="100%" sm="30%" key={item.id} data={item} alo />)
                    }
                </Grid>
                <Box marginTop={1} padding={1}>
                    <Button fullWidth color="primary" variant="contained" size="large">
                        <FormattedMessage
                            id="pal.dasboard_palList"
                        />
                    </Button>
                </Box>

            </div>
        </Authentication>
    );
}

Pal.propTypes = {

};

export default Pal;
