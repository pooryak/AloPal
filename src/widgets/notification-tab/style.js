import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        marginTop: theme.spacing(3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    form_btn: {
        margin: theme.spacing(2, 0),
        width: '40%',
    },
    icon: {
        color: theme.palette.secondary.main,
    },
}));

export default useStyle;
