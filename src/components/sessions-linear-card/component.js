import {
    Paper, Box, Avatar, Button, IconButton,
} from '@material-ui/core';
import SmsIcon from '@material-ui/icons/Sms';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import PropTypes from 'prop-types';
import compiled from 'compiled.js';
import style from './style';

// console.log("🚀 ~ file: component.js ~ line 9 ~ compiled", compiled)
function SessionsLinearCard(props) {
    const { handleCancel, pal } = props;
    const classes = style(props);
    const {
        name, description, date, duration, history,
    } = props.data;
    let buttonComponent;
    if (!history && !pal) {
        buttonComponent = (
            <Button variant="contained" className={classes.cancel_btn} onClick={handleCancel}>
                <FormattedMessage id="general.cancel" />
            </Button>
        );
    } else if (history && history === 1 && !pal) {
        buttonComponent = (
            <Link href="/dashboards/ALO/sessions-and-courses/3/review">
                <Button variant="outlined" className={classes.review_btn}>
                    <FormattedMessage id="general.writeReview" />
                </Button>
            </Link>
        );
    } else if (history && history === 2 && !pal) {
        buttonComponent = (
            <>
                <IconButton color="secondary">
                    <SmsIcon />
                </IconButton>

            </>

        );
    } else if (pal) {
        buttonComponent = (
            <Box display="flex" className={classes.btnes}>
                <Link href="/dashboards/pal/sessions-and-courses/3/history">
                    <Box>
                        <Button variant="contained">
                            View past sessions
                        </Button>
                    </Box>
                </Link>
                <Box className={classes.sessionBtn}>
                    <Button variant="contained" disabled>
                        test2
                    </Button>
                </Box>
            </Box>
        );
    }
    return (
        <div className={classes.root}>
            <Box className={classes.avatar}>
                <Avatar />
            </Box>
            <Box marginLeft={1} className={classes.desc}>
                <Box fontWeight={500} color="aloPal.dark" fontSize={20}>
                    {name}
                </Box>
                {
                    !pal && (
                        <Box fontFamily="Roboto" fontWeight={400} fontSize={14}>
                            {description}
                        </Box>
                    )
                }

            </Box>
            <Box marginLeft={1} justifySelf="flex-end" className={classes.date}>
                <Box fontWeight={700} fontSize={18} color="aloPal.dark">
                    {date}
                </Box>
            </Box>
            <Box marginLeft={1} justifySelf="flex-end" className={classes.duration}>
                <Box fontWeight={400} fontSize={14} fontFamily="Roboto">
                    {duration}
                    {' '}
                    <FormattedMessage id="sessions.card.duration" />
                </Box>
            </Box>
            <Box marginLeft="auto"  justifySelf="flex-end" className={classes.buttons}>
                {buttonComponent}
            </Box>
        </div>
    );
}

SessionsLinearCard.propTypes = {

};

export default SessionsLinearCard;
