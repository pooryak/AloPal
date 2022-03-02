import {
    Paper, Box, Button, Table,
    TableHead, TableRow, TableBody, TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import { CreditCard } from '@material-ui/icons';
import PropTypes from 'prop-types';

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
    main: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    table: {
        overflowX: 'auto',
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
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
        <Paper elevation={1} className={classes.root}>
            <Box marginTop={2} textAlign="center" fontSize={14}>
                Your Balance
            </Box>
            <Box marginTop={0.5} textAlign="center" fontSize={24} fontWeight={500}>
                $125
            </Box>
            <Box marginTop={1} textAlign="center" fontSize={24} fontWeight={500}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<CreditCard />}
                    size="medium"
                >
                    Withdraw
                </Button>
            </Box>
            <Box marginTop={2} fontSize={14} fontWeight={500}>
                List of transactions
            </Box>
            <Box marginTop={1} className={classes.table}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>TransactionID</StyledTableCell>
                            <StyledTableCell align="right">Time</StyledTableCell>
                            <StyledTableCell align="right">Amount</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
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
                                <StyledTableCell align="right">{row.Status}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

        </Paper>
    );
}

Wallet.propTypes = {

};

export default Wallet;
