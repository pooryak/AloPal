import { useState } from 'react';
import {
    Paper, Box, Button,
} from '@material-ui/core';
import { SessionsLinearCard } from 'src/components';
import { FormattedMessage } from 'react-intl';
// import { DatePicker } from '@material-ui/pickers';
import { getFullDay } from 'src/utility/date';
import PropTypes from 'prop-types';
import Link from 'next/link';
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
    headerBox: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    statisticsBox: {
        backgroundColor: theme.palette.grey[300],
        borderRadius: theme.spacing(),
        flex: 1,
        padding: theme.spacing(),
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(),
        },
        '& $div': {
            flex: 1,
        },
    },
}));

const data = [{
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

function SessionsAndCourses(props) {
    const classes = useStyles();
    const [date, changeDate] = useState(new Date());
    return (
        <Paper elevation={1} className={classes.root}>
            <Box fontWeight={700} fontSize={24}>
                <FormattedMessage id="pal.sessions.title" />
            </Box>
            <Box display="flex" marginTop={2} className={classes.headerBox}>
                <Box>
                    {/* <DatePicker
                        autoOk
                        // orientation="landscape"
                        variant="static"
                        openTo="date"
                        value={date}
                        onChange={changeDate}
                    /> */}
                </Box>
                <Box className={classes.statisticsBox} display="flex" alignSelf="stretch" flexDirection="column">
                    <Box display="flex">
                        <Box fontSize={18} fontWeight={700} alignItems="center">
                            <Box fontSize={48} fontWeight={700}>
                                83
                            </Box>
                            TOTAL SESSIONS
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Link href="/dashboards/PAL/sessions-and-courses/date-management">
                                <Button variant="contained">
                                    Date & Time
                                    Management
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                    <Box display="flex">
                        <Box fontSize={18} fontWeight={700}>
                            <Box fontSize={48} fontWeight={700}>
                                83
                            </Box>
                            TOTAL SESSIONS
                        </Box>
                        <Box fontSize={18} fontWeight={700}>
                            <Box fontSize={48} fontWeight={700}>
                                83
                            </Box>
                            TOTAL SESSIONS
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box display="flex" marginTop={2} justifyContent="space-between" fontWeight={700} fontSize={24}>
                <Box>
                    {getFullDay(date)}
                </Box>
                <Box>
                    <FormattedMessage id="pal.sessions.number" values={{ value: 7 }} />
                </Box>
            </Box>
            <Box marginTop={1} display="flex" flexDirection="column">
                {
                    data.map((item) => <SessionsLinearCard data={item} key={item.id} pal />)
                }
            </Box>
        </Paper>
    );
}

SessionsAndCourses.propTypes = {

};

export default SessionsAndCourses;
