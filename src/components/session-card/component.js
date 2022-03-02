import {
    Grid, Paper, Box, Avatar, Button,
} from '@material-ui/core';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import style from './style';

function SessionsCard(props) {
    const {
        xs, sm, data, alo,
    } = props;
    const classes = style({ xs, sm });
    const {
        star, pic, name, family, description, sessions,
    } = data;
    return (
        <Grid className={classes.root}>
            <div className={classes.container}>
                <Box className={classes.sessions} fontSize={12}>
                    {sessions}
                    <br />
                    Sessions
                </Box>
                <Box
                    display="flex"
                    alignSelf="stretch"
                    justifyContent="center"
                    marginTop={4}
                    className={classes.img_wrap}
                >
                    <Avatar className={classes.img} src={pic} />
                </Box>

                <Box fontWeight={700} marginTop={1} fontSize={20} textAlign="center" className={classes.name}>
                    {`${name} ${family}`}
                </Box>

                <Box fontWeight={300} fontSize={14} textAlign="center" padding={1}>
                    Specialty
                </Box>

                <footer className={classes.footer}>

                    {
                        // TODO: 'diffrenet path'
                        alo ? (
                            <Button href="/" fullWidth>
                                <FormattedMessage id="sessioncard.session" />
                            </Button>
                        ) : (
                            <Button href="/" fullWidth>
                                <FormattedMessage id="sessioncard.book" />
                            </Button>
                        )
                    }
                </footer>

            </div>
        </Grid>
    );
}

// TODO: specify propTypes
SessionsCard.propTypes = {

};

export default SessionsCard;
