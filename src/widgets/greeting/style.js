import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    greeting_items: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    name: {
        fontSize: '36px',
        fontWeight: 700,
        marginRight: theme.spacing(0.5),
    },
    alert_ctn: {
        marginRight: theme.spacing(1.25),
    },
}));

export default useStyles;
