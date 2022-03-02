import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        // width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        marginTop: theme.spacing(3),
        '& .MuiTextField-root': {
            [`margin${theme.direction.direction === 'rtl' ? 'Left' : 'Right'}`]: 0,
            width: '50%',
            borderRadius: theme.spacing(),
            [theme.breakpoints.down('sm')]: {
                maxWidth: 'unset',
            },
        },
        '& $label': {
            paddingLeft: theme.spacing(),
        },
        '& .MuiFilledInput-root': {
            borderRadius: theme.spacing(),
        },
        '& .MuiFilledInput-input': {
            paddingTop: '25px',
        },
    },
    form_btn: {
        margin: theme.spacing(0, 'auto'),
        marginTop: theme.spacing(10),
        borderRadius: theme.palette.boxBorderRadius,
        padding: theme.spacing(1.1, 4),
        color: theme.palette.common.white,
        // width: '40%',
    },
}));

export default useStyle;
