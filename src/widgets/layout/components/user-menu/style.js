import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: 'unset',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: theme.palette.textColor,
        borderRadius: theme.spacing(4),
        whiteSpace: 'nowrap',
    },
    button: {
        whiteSpace: 'nowrap !important',
    },
    navDisplayFlex: {
        display: 'flex',
        justifyContent: 'flex-end',
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
        backgroundColor: 'white',
    },
    registered: {
        padding: '70px !important',
    },
    aTag: {
        // border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '7px',
        marginLeft: '5px',
        minWidth: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 'unset !important',
        cursor: 'pointer',
        '& .Mui-selected': {
            backgroundColor: theme.palette.aloPal.blue,
        },
    },
    expanded: {
        whiteSpace: 'nowrap',
        // marginRight: theme.spacing(2),
        width: '70%',
        padding: theme.spacing(1, 0),
    },
    cardContainer: {
        margin: theme.spacing(1, 0),
    },
    card: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        borderBottom: '1px solid grey',
        textAlign: 'left',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(1),
    },
    cover: {
        width: 80,
        backgroundColor: '#333',
        backgroundReapet: 'no-repeat',

    },
    popTitle: {
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& $div': {
            textAlign: 'right',
        },
    },
}));

export default useStyle;
