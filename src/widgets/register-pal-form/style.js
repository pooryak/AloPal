import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(9, 2),
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        '& .MuiPaper-root': {
            marginTop: theme.spacing(1),
            background: 'unset',
        },
    },
    labels: {
        '& .MuiStepLabel-label': {
            display: 'none',
        },
    },
    buttons: {
        marginTop: theme.spacing(3),
        display: 'flex',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        width: '100%',
    },
}));

export default useStyle;
