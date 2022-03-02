import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: 'unset',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'center',
        color: theme.palette.white,
        [theme.breakpoints.up('sm')]: {
            color: theme.palette.textColor,
        },
        whiteSpace: 'nowrap',
        width: 'unset',
        '& $svg': {
            color: theme.palette.secondary.main,
        },
    },
    mobile: {
        color: theme.palette.white,
    },
    mobileChild: {
        marginLeft: theme.spacing(1),
    },
    button: {
        whiteSpace: 'nowrap !important',
        '& $span': {
            marginLeft: 0,
        },
        marginLeft: theme.spacing(2),
    },
    navDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#fff',
        flex: 2,
    },
    regularBut: {
        cursor: 'pointer',
        padding: '0 5px',
        borderRadius: '5px',
        marginRight: '20px',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            transition: `background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
        },
    },
    loginBackground: {
        backgroundColor: theme.palette.thirdinary,
    },
    registered: {
        padding: '70px !important',
    },
    aTag: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '7px',
        marginLeft: '5px',
        minWidth: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 'unset !important',
        cursor: 'pointer',
    },
    '@keyframes blinker': {
        from: { opacity: 1 },
        to: { opacity: 0 },
    },
    badge: {
        '& .MuiBadge-badge': {
            animationName: '$blinker',
            animationDuration: '2s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',

        },
    },
}));

export default useStyle;
