import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        '& $p': {
            textAlign: 'center',
            margin: theme.spacing(1.5, 0),
        },
        '& .MuiAvatar-root': {
            height: '60px',
            width: '60px',
        },
    },
}));

export default useStyles;
