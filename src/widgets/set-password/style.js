import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        margin: theme.spacing(5, 0),
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        marginTop: theme.spacing(3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1, 'auto'),
        },
    },
    form_btn: {
        margin: theme.spacing(1, 'auto'),
    },
}));
export default useStyles;
