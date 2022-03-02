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
    input: {
        position: 'relative',
        display: 'inline-block',
        padding: theme.spacing(1.5, 2),
        alignItems: 'center',
        alignSelf: 'stretch',
        '& $input': {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            width: '100%',
            height: '100%',
        },
        // '& $button': {
           
        // },
    },
    label: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: 'flex',
        alignSelf: 'stretch',
        '& $button': {
            marginLeft: theme.spacing(1),
            height: theme.spacing(4),
            alignSelf: 'center',
        },
        '& .MuiAvatar-root': {
            width: '60px',
            height: '60px',
        },
    },
    titles: {
        padding: theme.spacing(1.5, 2),
    },
}));

export default useStyle;
