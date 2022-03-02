import { Container } from 'src/components';
import {
    Box, Divider, Typography, Paper,
    Checkbox, FormControlLabel, Avatar, Button,
} from '@material-ui/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    billing_title: {
        color: theme.palette.primary.dark,
        fontSize: '1.5rem',
    },
    root: {
        minWidth: '50%',
        marginTop: theme.spacing(2),
        padding: theme.spacing(2, 4),
    },
    section: {
        width: '60%',
        '& $hr': {
            borderStyle: 'dashed',
            borderColor: '#CFD8DC',
        },
    },
    total_value: {
        color: theme.palette.secondary.main,
    },
    box: {
        backgroundColor: theme.palette.grey[300],
        borderRadius: '5px',
        padding: theme.spacing(2, 4),
    },
    logo: {
        width: '60px',
        height: '60px',
        marginRight: theme.spacing(1),
    },
    descBox: {
        width: '50%',
        justifyContent: 'center',
    },
    text: {
        marginLeft: theme.spacing(1),
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#736f6f',
    },
    status: {
        borderRadius: '5px',
        backgroundColor: theme.palette.grey[700],
        color: 'white',
    },
    calendarBtn: {
        marginTop: theme.spacing(2),
        borderRadius: theme.palette.boxBorderRadius,
        color: theme.palette.aloPal.blue,
        fontWeight: 500,
    },
    icon: {
        color: theme.palette.secondary.main,
    },
}));

function Payment(props) {
    const classes = useStyles();
    const router = useRouter();
    let statusComponent;
    if (router.query && router.query.status && router.query.status === 'successful') {
        statusComponent = (
            <>
                <Box padding={2} justifyContent="center" mt={1} mb={1}>
                    <Typography color="success.main" textAlign="center" fontWeight={400}>
                        <FormattedMessage id="payment.success_title" />
                    </Typography>
                </Box>
                <Box marginTop={2} display="flex" flexDirection="column" justifyContent="center" width="60%" margin="auto">
                    <Box display="flex">
                        <Box>
                            <Avatar className={classes.logo} />
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Box fontWeight={500} fontSize="20px" display="flex" justifyContent="space-between" alignItems="center">
                                <Box color="primary.main">
                                    John Smith
                                </Box>
                                <Box fontSize={12}>
                                    2 sessions
                                </Box>
                            </Box>
                            <Box fontSize={14}>
                                Lorem ipsum dolor sit amet, tempor incididunt ut labore et.
                            </Box>
                        </Box>
                    </Box>
                    <Box mt={2} mb={2} display="flex" justifyContent="center">
                        <Button variant="outlined" className={classes.calendarBtn}>
                            <FormattedMessage id="payment.btn_setCalendar" />
                        </Button>
                    </Box>
                </Box>
            </>
        );
    } else if (router.query && router.query.status && router.query.status === 'unsuccessful') {
        statusComponent = (
            <Box padding={2} className={classes.status}>
                <Typography>
                    Payment is not successfully proceeded
                </Typography>
            </Box>
        );
    } else {
        statusComponent = (
            <Box>
                <Box fontWeight={600} color="primary" marginTop={1.5}>
                    <FormattedMessage id="payment.biltitle" />
                </Box>
                <Box
                    fontWeight={600}
                    fontSize={14}
                    marginTop={1}
                    marginBottom={1}
                    display="flex"
                    alignItems="center"
                >
                    <Typography variant="caption" color="#736F6F" mr={1}>
                        <FormattedMessage id="payment.billTo" />
                        :
                    </Typography>
                    <Box color="primary.main">
                        Koby Bryant
                    </Box>
                </Box>
                <Box
                    fontWeight={600}
                    fontSize={14}
                    marginTop={1}
                    marginBottom={1}
                    display="flex"
                    alignItems="center"
                >
                    <Typography variant="caption" color="#736F6F" mr={1}>
                        <FormattedMessage id="payment.emailAdress" />
                        :
                    </Typography>
                    <Box color="primary.main">
                        Someone@example.com
                    </Box>
                </Box>
                <Box
                    fontWeight={600}
                    fontSize={14}
                    marginTop={1}
                    marginBottom={1}
                    display="flex"
                    alignItems="center"
                >
                    <Typography variant="caption" color="#736F6F" mr={1}>
                        <FormattedMessage id="payment.phoneNumber" />
                        :
                    </Typography>
                    <Box color="primary.main">
                        +1 123 456 7898
                    </Box>
                </Box>
                <Box
                    fontWeight={600}
                    fontSize={14}
                    marginTop={1}
                    marginBottom={1}
                    display="flex"
                    alignItems="center"
                >
                    <Typography variant="caption" color="#736F6F" mr={1}>
                        <FormattedMessage id="payment.country" />
                        :
                    </Typography>
                    <Box color="primary.main">
                        Canada
                    </Box>
                </Box>
                <Box mt={2} className={classes.box}>
                    <Box display="flex" justifyContent="space-between" fontWeight={600} color="primary.main">
                        <div>
                            <FormattedMessage id="payment.walletBalance" />
                        </div>
                        <div>
                            <span className={classes.total_value}>$</span>
                            <FormattedNumber value={80} />
                        </div>
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    label={<FormattedMessage id="payment.checkBox" />}
                                    name={<FormattedMessage id="payment.checkBox" />}
                                    icon={<CircleUnchecked className={classes.icon} />}
                                    checkedIcon={<CircleChecked className={classes.icon} />}
                                />
                            )}
                            label={<FormattedMessage id="payment.checkBox" />}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={1} fontWeight={600} color="primary.main">
                        <div>
                            <FormattedMessage id="payment.totalPayment" />
                        </div>
                        <div>
                            <span className={classes.total_value}>$</span>
                            <FormattedNumber value={80} />
                        </div>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-around" alignItems="center" marginTop={4} color="primary.main">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Avatar src="https://images.app.goo.gl/ne8mBvuWr5Ve4K2z5" className={classes.logo} />
                        {' '}
                        <div>
                            <Box fontSize="13px" component="span" fontWeight={400}>
                                Pay With
                            </Box>
                            <br />
                            <Box fontSize="16px" fontWeight={700}>
                                PalPayl
                            </Box>

                        </div>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Avatar src="https://images.app.goo.gl/ne8mBvuWr5Ve4K2z5" className={classes.logo} />
                        {' '}
                        <div>
                            <Box fontSize="13px" component="span" fontWeight={400}>
                                Pay With
                            </Box>
                            <br />
                            <Box fontSize="16px" fontWeight={700}>
                                Debt
                            </Box>
                        </div>
                    </Box>
                </Box>
            </Box>
        );
    }
    return (
        <Container>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Box mb={4} fontWeight={700} className={classes.billing_title}>
                    <FormattedMessage id="payment.billing" />
                </Box>
                <Paper elevation={5} className={classes.root}>
                    <Box fontWeight={600} color="primary">
                        <FormattedMessage id="payment.title" />
                    </Box>
                    <Box marginTop={1} marginBottom={1}>
                        <Typography variant="caption" fontFamily="Roboto" color="#9F9F9F">
                            <FormattedMessage id="payment.description" />
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignContent="center"
                        mt={2}
                        flexDirection="column"
                        alignItems="center"
                    >
                        <div className={classes.section}>
                            <Divider />
                            <Box marginTop={1} marginBottom={1} display="flex" justifyContent="space-between">
                                <Typography variant="caption">
                                    {2}
                                    {' '}
                                    <FormattedMessage id="payment.sessions" />
                                </Typography>
                                <Typography variant="caption">
                                    <FormattedNumber value={80} style="currency" currency="USD" />
                                </Typography>
                            </Box>
                            <Divider />
                            <Box marginTop={1} marginBottom={1} display="flex" justifyContent="space-between">
                                <Typography variant="caption">
                                    <FormattedMessage id="payment.subtotal" />
                                </Typography>
                                <Typography variant="caption">
                                    <FormattedNumber value={80} style="currency" currency="USD" />
                                </Typography>
                            </Box>
                            <Divider />
                            <Box marginTop={1} marginBottom={1} display="flex" justifyContent="space-between">
                                <Typography variant="caption">
                                    <FormattedMessage id="payment.gst" />
                                </Typography>
                                <Typography variant="caption">
                                    <FormattedNumber value={0.91} style="currency" currency="USD" />
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                marginTop={0.5}
                                marginBottom={1}
                                display="flex"
                                color="primary.main"
                                justifyContent="space-between"
                                fontWeight={500}
                            >
                                <span>
                                    <FormattedMessage id="payment.total" />
                                </span>
                                <div>
                                    <span className={classes.total_value}>$</span>
                                    <span>
                                        <FormattedNumber value={80} />
                                    </span>
                                </div>
                            </Box>
                        </div>
                    </Box>
                    {statusComponent}
                </Paper>
                {
                    router && !router.query.status && (
                        <Box marginTop={2} padding={[1, 2]} display="flex" className={classes.descBox}>
                            <Image src="/assets/image/lock.svg" width={30} height={36} />
                            <Typography fontFamily="Roboto" fontWeight={400} fontSize={14} color="#736F6F" ml={1}>
                                For your security, ALOPAL does not store credit card details.
                                Stripe is our secure payment provider. Find out more
                            </Typography>
                        </Box>
                    )
                }

            </Box>
        </Container>
    );
}

Payment.propTypes = {

};

export default Payment;
