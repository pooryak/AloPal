import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        cursor: 'pointer',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden',
        margin: theme.spacing(1, 0),
     boxShadow: '0px 3px 6px 0px #00000029',
        borderRadius: theme.spacing(),
        transition: theme.transitions.create(['background', 'box-shadow'], {
            duration: theme.transitions.duration.complex,
        }),
        '&:hover': {
            boxShadow: '-3px 5px 12px -2px rgba(0,0,0,0.63)',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            textAlign: 'center',
        },
    },
    avatar: {
        padding: theme.spacing(0.5, 2),
    },
    date: {
        padding: theme.spacing(0.5, 2),
    },
    duration: {
        // border: '1px solid #000',
        // borderRadius: theme.spacing(),
        // padding: theme.spacing(1, 3),
        color: theme.palette.grey[600],
    },
    desc: (props) => ({
        padding: theme.spacing(0.5, 2),
        width: props.pal ? '40%' : '40%',
        [theme.breakpoints.down('sm')]: {
            width: 'unset',
        },
    }),
    buttons: {
        flex: 1,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancel_btn: {
        borderRadius: theme.palette.boxBorderRadius,
        backgroundColor: theme.palette.grey[400],
    },
    review_btn: {
        borderRadius: theme.palette.boxBorderRadius,
    },
    btnes: {
        height: '100%',
        flex: 1,
        '& $div': {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
        },
    },
    sessionBtn: {
        backgroundColor: theme.palette.grey[300],
    },
}));

export default useStyles;
