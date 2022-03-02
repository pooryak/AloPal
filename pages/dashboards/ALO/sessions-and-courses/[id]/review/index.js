import {
    Paper, Box, Button, Avatar, Typography, TextField, Rating,
} from '@material-ui/core';
import { useState } from 'react';
import clsx from 'clsx';
import { PageTitle } from 'src/components';
import { makeStyles } from '@material-ui/styles';
import { useToken } from 'src/utility/hooks';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ApiRateRepository } from 'repository';
import decoder from 'compiled.js';

console.log('🚀 ~ file: index.js ~ line 12 ~ decoder', decoder);

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(7),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
        padding: theme.spacing(2, 4),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        '& .MuiFilledInput-root': {
            borderRadius: theme.spacing(),
        },
    },
    main: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    star: {
        color: theme.palette.grey[300],
        cursor: 'pointer',
        transition: theme.transitions.create(['background', 'box-shadow'], {
            duration: theme.transitions.duration.complex,
        }),
        '&:hover': {
            boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
        },
        marginRight: theme.spacing(1),
    },
    favedStar: {
        color: '#ffc107',
    },
    rating: {
        '& $svg': {
            color: theme.palette.secondary.main,
        },
    },
    container_btn: {
        '& $button': {
            borderRadius: theme.palette.boxBorderRadius,
            color: theme.palette.common.white,
        },
    },
    
}));

function Review(props) {
    const classes = useStyles();
    const tokenStatus = useToken();
    const [starValue, setStarValue] = useState(0);
    const [comment, setComment] = useState();
    const registerRate = useMutation((user) => ApiRateRepository.apiRatePost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.RateServiceResponse.decode(apiData.data);
            console.log('🚀 ~ file: index.js ~ line 115 ~ registerMutation ~ decodedData', decodedData);
            // setData(decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });
    const handleRating = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            rate: {
                comment,
                ratingScore: starValue,
                serviceProfileId: {
                    value: 1,
                },
                meetId: {
                    value: 14,
                },
            },
        };
        const verify = decoder.alopal.backend.services.RateServiceRequest.create(dataWithContext);
        console.log('🚀 ~ file: index.js ~ line 80 ~ handleRating ~ verify', verify);
        const encodedData = decoder.alopal.backend.services.RateServiceRequest.encode(verify).finish();
        await registerRate.mutateAsync(encodedData);
    };
    return (
        <Paper elevation={1} className={classes.root}>
            <PageTitle>
                <Box fontSize={24}>
                    <FormattedMessage id="review.title" />

                </Box>
            </PageTitle>
            <Box marginTop={2}>
                <Box display="flex" alignItems="center">
                    <Box>
                        <Avatar />
                    </Box>
                    <Box display="flex" flexDirection="column" marginLeft={1}>
                        <Box fontWeight={500} fontSize={20}>
                            Jhon Smith
                        </Box>
                        <Typography variant="caption">
                            Lorem ipsum dolor sit amet, tempor incididunt ut labore et.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box marginTop={4}>
                <Box fontWeight={500} fontSize={14}>
                    <FormattedMessage id="review.feedback" />
                </Box>
                <Box display="flex" className={classes.rating}>
                    <Rating
                        color="secondary"
                        name="simple-controlled"
                        value={starValue}
                        onChange={(event, newValue) => {
                            setStarValue(newValue);
                        }}
                    />
                </Box>
            </Box>
            <Box marginTop={2}>
                <TextField
                    fullWidth
                    id="outlined-textarea"
                    className={classes.textarea}
                    multiline
                    variant="filled"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
            </Box>
            <Box marginTop={2} display="flex" justifyContent="center" className={classes.container_btn}>
                <Button variant="contained" size="large" color="secondary" onClick={handleRating}>
                    <FormattedMessage id="review.send" />
                </Button>

            </Box>
        </Paper>
    );
}

Review.propTypes = {

};

export default Review;
