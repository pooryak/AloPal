import { Container } from 'src/components';
import { Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import style from './style';

function Greeting(props) {
    const classes = style();
    const { data } = props;
    const today = new Date();
    const currentHour = today.getHours();
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
        <Container style={{ padding: '20px 16px' }}>
            <Box display="flex" justifyContent="space-between" className={classes.greeting_items}>
                <Typography component="h3" className={classes.name}>
                    {greetingTxt}
                    {' '}
                    {' '}
                    {data?.profile?.privateInformation?.identification?.firstName}
                </Typography>
                <Box display="flex">
                    <Box display="flex" alignItems="center" className={classes.alert_ctn}>
                        <Typography component="h3" className={classes.name}>
                            24
                        </Typography>
                        <Box>
                            New
                            {' '}
                            <br />
                            Messages
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center" className={classes.alert_ctn}>
                        <Typography component="h3" className={classes.name}>
                            2
                        </Typography>
                        <Box>
                            Upcoming
                            {' '}
                            <br />
                            Sessions & Courses
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Container>
    );
}

Greeting.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Greeting;
