import {
    Paper, Box, Avatar, Typography, Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import style from './style';

function ModalBody(props) {
    const classes = style();
    const { handleClose } = props;
    return (
        <Paper className={classes.root}>
            <Box display="flex" justifyContent="flex-end">
                <CloseIcon onClick={handleClose} />
            </Box>
            <Box justifyContent="center" fontWeight={700} fontSize={36} textAlign="center" color="aloPal.dark">
                <FormattedMessage id="modal.cancel_session" />
            </Box>
            <Box marginTop={2} fontWeight={400} fontFamily="Roboto" textAlign="center">
                <FormattedMessage id="modal.confirmation" />
            </Box>
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Box>
                    <Avatar />
                </Box>
                <Box display="flex" flexDirection="column" marginLeft={2}>
                    <Box fontWeight={500} fontSize={20} color="aloPal.dark">
                        Jhon Smith
                    </Box>
                    <Box fontWeight={400} fontSize={14}>
                        <Typography variant="caption">

                            Lorem ipsum dolor sit amet, tempor incididunt ut labore et.
                        </Typography>
                    </Box>

                </Box>

            </Box>
            <Box display="flex" justifyContent="center" marginTop={2} >
                <Box fontWeight={500} fontSize={18} color="aloPal.dark">
                    Tuesday 15 SEP 2020
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" marginTop={3} marginBottom={3}>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.cancel_btn}
                >
                    Cancel Session
                </Button>
            </Box>
        </Paper>
    );
}

ModalBody.propTypes = {

};

export default ModalBody;
