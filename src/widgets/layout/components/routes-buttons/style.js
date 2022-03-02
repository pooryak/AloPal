import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: 'unset',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: theme.palette.textColor,
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
    },
    button: {
        whiteSpace: 'nowrap !important',
    },
    navDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        color: theme.palette.textColor,
        flex: 2,
        '& .MuiListItem-root': {
            marginRight: 10,
        },
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
    nav_logo: {
        position: 'relative',
        minWidth: '110px',
        height: '27px',
        cursor: 'pointer',
        marginRight: theme.spacing(9),
    },
    listWrapper: {
        fontWeight: 500,
        '& $svg': {
            color: theme.palette.secondary.main,
        },
    },
}));

export default useStyle;
