import {
    Paper, Box, Button, Table,
    TableHead, TableRow, TableBody, TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(7),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
        padding: theme.spacing(2, 2),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.spacing(),
    },
    main: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    table: {
        overflowX: 'auto',
    },
    sign: {
        color: theme.palette.secondary.main,
    },
    button: {
        borderRadius: theme.palette.boxBorderRadius,
        fontWeight: 700,
    },
    status: {
        color: `${theme.palette.success.main} !important`,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.aloPal.dark,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: 'Roboto',
        color: '#333333',
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(TransactionID, Time, Amount, PaymentMethod, Status) {
    return {
        TransactionID, Time, Amount, PaymentMethod, Status,
    };
}

const rows = [
    createData(123456789, '02.09.2020 - 11:38', '$40.0', 'Direct payment', 'Successful'),
    createData(123456789, '02.09.2020 - 11:38', '$40.0', 'Wallet Charge', 'Successful'),
    createData(123456789, '02.09.2020 - 11:38', '$40.0', 'Direct payment', 'Successful'),
    createData(123456789, '02.09.2020 - 11:38', '$40.0', 'Direct payment', 'Successful'),
    createData(123456789, '02.09.2020 - 11:38', '$40.0', 'Direct payment', 'Successful'),
];

function Wallet(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Box marginTop={2} textAlign="center" fontSize={18} fontWeight={500} color="aloPal.dark">
                <FormattedMessage id="wallet.title" />
            </Box>
            <Box marginTop={0.5} textAlign="center" fontSize={28} fontWeight={700} color="aloPal.dark">
                <span className={classes.sign}>
                    $
                </span>
                125
            </Box>
            <Box marginTop={1} textAlign="center" fontSize={24} fontWeight={500}>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    // startIcon={<CreditCardIcon />}
                    size="medium"
                >
                    <FormattedMessage id="wallet.add_credit" />
                </Button>
            </Box>
            <Box marginTop={2} fontSize={14} fontWeight={400} mb={1} color="aloPal.dark">
                <FormattedMessage id="wallet.list" />
            </Box>
            <Box marginTop={1} className={classes.table}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><FormattedMessage id="wallet.table.transaction" /></StyledTableCell>
                            <StyledTableCell align="right"><FormattedMessage id="wallet.table.time" /></StyledTableCell>
                            <StyledTableCell align="right"><FormattedMessage id="wallet.table.Amount" /></StyledTableCell>
                            <StyledTableCell align="right"><FormattedMessage id="wallet.table.paymentMethod" /></StyledTableCell>
                            <StyledTableCell align="right"><FormattedMessage id="wallet.table.status" /></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.TransactionID}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.Time}</StyledTableCell>
                                <StyledTableCell align="right">{row.Amount}</StyledTableCell>
                                <StyledTableCell align="right">{row.PaymentMethod}</StyledTableCell>
                                <StyledTableCell align="right" className={classes.status}>{row.Status}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

        </div>
    );
}

Wallet.propTypes = {

};

export default Wallet;
