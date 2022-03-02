import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.thirdinary[300],
        borderRadius: '4px',
        padding: theme.spacing(2, 2),
    },
    filter_icon: {
        color: theme.palette.thirdinary[400],
        marginRight: theme.spacing(1),
    },
    filter_clear: {
        fontSize: '11px',
    },
    filter_title: {
        fontSize: '16px',
        fontWeight: 500,
        marginTop: theme.spacing(2),
    },
    filter_option: {
        '& .MuiFormControlLabel-label': {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    btn_remove: {
        textOverflow: 'ellipsis',
    },
}));

export default useStyle;
