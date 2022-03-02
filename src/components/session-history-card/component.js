import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from './style';

function SessionHistoryCard(props) {
    const classes = style();
    const { data } = props;
    return (
        <Box className={classes.root}>
            <Box fontWeight={500} fontSize={18}>
                {data.date}
            </Box>
            <Box fontWeight={600} fontSize={14} className={classes.duration}>
                {data.duration}
            </Box>
        </Box>
    );
}

SessionHistoryCard.propTypes = {

};

export default SessionHistoryCard;
