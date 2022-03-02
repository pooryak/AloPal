import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(9, 2),
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
    },
    icon: {
        color: theme.palette.secondary.main,
        fontSize: '6rem',
    },
    welcome_title: {
        color: theme.palette.aloPal.dark,
        fontWeight: 700,
        '& $span': {
            color: theme.palette.secondary.main,
        },
    },
    description: {
        color: theme.palette.aloPal.shades[6],
    },
}));

export default useStyle;
