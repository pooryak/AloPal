import { Container } from 'src/components';
import { LoginBanner, RegisterPalForm } from 'src/widgets';
import { Box,Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
}));
function PalRegistration(props) {
    const classes = useStyle();
    return (
        <Container max-width="lg">
            <Grid item xs={12} className={classes.root}>
                <LoginBanner />
                <RegisterPalForm />
            </Grid>
        </Container>
    );
}

PalRegistration.propTypes = {

};

export default PalRegistration;
