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
        '& .react-datepicker-wrapper': {
            width: '100%',
            padding: theme.spacing(2),
        },
        '& .react-datepicker__input-container': {
            width: '100%',
            '& input': {
                border: 'none',
                backgroundColor: 'transparent',
                width: '100%',
            },
        },
        '& .react-datepicker-ignore-onclickoutside': {
            border: 'none',
            backgroundColor: 'transparent',
            width: '100%',
        },
        '& .react-datepicker-popper': {
            zIndex: 2,
        },
    },
    titles: {
        padding: theme.spacing(1, 2),
    },
    form_row: {
        margin: theme.spacing(1),
        marginLeft: 0,
        display: 'flex',
        justifyContent: 'space-between',
    },
    formControl: {
        margin: 'unset !important',
        width: 'unset !important',
        minWidth: '40% !important',
    },
}));

export default useStyle;
