import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        marginTop: theme.spacing(3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
            width: '100%',
        },
    },
    form_row: {
        margin: theme.spacing(1),
        marginLeft: 0,
        display: 'flex',
        justifyContent: 'space-between',
    },
    formControl: {
        margin: '8px 0 !important',
        width: 'unset !important',
        minWidth: '40%',
    },
}));

export default useStyle;
