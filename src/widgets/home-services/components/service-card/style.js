import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        maxWidth: '350px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1),
        },
    },
    button_container: {
        backgroundColor: theme.palette.thirdinary[500],
    },
    button: {
        color: '#fff',
    },
}));

export default useStyle;
