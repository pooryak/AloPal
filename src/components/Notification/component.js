import { useState, useEffect } from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

function Notification(props) {
    const {
        snackState, duration, message, severity,
    } = props;
    const [state, setState] = useState(snackState);
    useEffect(() => {
        setState(snackState);
    }, [snackState]);
    const handleSnack = () => {
        setState(false);
    };
    return (
        <Snackbar
            open={state}
            autoHideDuration={duration}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            TransitionComponent={TransitionLeft}
            message={message}
        >
            <MuiAlert elevation={6} variant="filled" onClose={handleSnack} severity={severity}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
}

Notification.propTypes = {
    snackState: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
};

export default Notification;
