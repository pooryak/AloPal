import {
    Paper, Box, Avatar, 
} from '@material-ui/core';
import { PageTitle, SessionHistoryCard } from 'src/components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

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
}));

const data = [{
    date: '15 SEP 2020 18:30',
    duration: '1 hour',
    id: 0,
}, {
    date: '15 SEP 2020 18:30',
    duration: '1 hour',
    id: 1,
}, {
    date: '15 SEP 2020 18:30',
    duration: '1 hour',
    id: 2,
}, {
    date: '15 SEP 2020 18:30',
    duration: '1 hour',
    id: 3,
}, {
    date: '15 SEP 2020 18:30',
    duration: '1 hour',
    id: 4,
}, {
    date: '15 SEP 2020 18:30',
    duration: '1 hour',
    id: 5,
}, {
    date: '15 SEP 2020 18:30',
    duration: '1 hour',
    id: 6,
}];
function History(props) {
    const classes = useStyles();
    return (
        <Paper elevation={1} className={classes.root}>
            <Box>
                <PageTitle>
                    Sessions History
                </PageTitle>
            </Box>
            <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Box fontSize={24} display="flex" fontWeight={600}>
                    <Avatar />
                    <Box marginLeft={2}>

                        Jhon Smith
                    </Box>
                </Box>
                <Box fontSize={22} fontWeight={600}>
                    <FormattedMessage id="pal.sessions.number" values={{ value: 7 }} />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" marginTop={2}>
                {
                    data.map((item) => <SessionHistoryCard data={item} />)
                }
            </Box>
        </Paper>
    );
}

History.propTypes = {

};

export default History;
