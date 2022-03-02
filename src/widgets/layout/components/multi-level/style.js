import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: 'unset',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: theme.palette.white,
        [theme.breakpoints.up('sm')]: {
            color: theme.palette.textColor,
        },
        whiteSpace: 'nowrap',
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
}));

export default useStyle;
