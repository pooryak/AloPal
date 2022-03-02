import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    expanded: {
        // marginRight: theme.spacing(2),
        padding: theme.spacing(1, 0),
        color: theme.palette.common.white,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontSize: '0.875rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
        '& $svg': {
            color: theme.palette.secondary.main,
        },
    },
    container: {
        padding: theme.spacing(0, 2),
    },
    cardContainer: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(),
        overflowY: 'auto',
        height: '373px',
        '&::-webkit-scrollbar': {
            width: '4px',
            backgroundColor: '#E2E1E1',
            borderRadius: theme.palette.boxBorderRadius,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.secondary.main,
            borderRadius: theme.palette.boxBorderRadius,
        },
    },
    card: {
        display: 'flex',
        padding: theme.spacing(1, 0),
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
        textAlign: 'left',
        paddingBottom: theme.spacing(2),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(1),
    },
    cover: {
        width: 65,
        height: 65,
        backgroundColor: '#333',
        backgroundReapet: 'no-repeat',

    },
    description: {
        color: theme.palette.grey[600],
    },
    popTitle: {
        width: '100%',
        textAlign: 'left',
        color: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& $div': {
            textAlign: 'right',
        },
    },
    // menu: {
    //     backgroundColor: theme.palette.secondary.main,
    // },
    '.MuiPaper-rounded': {
        backgroundColor: theme.palette.secondary.main,
        position: 'relative',
        '&:after': {
            content: ' ',
            position: 'absolute',
            width: 20,
            height: 20,
        },
    },
    and: {
        color: theme.palette.secondary.main,
    },
    all_session_btn: {
        color: theme.palette.aloPal.dark,
        fontSize: 14,
        borderRadius: theme.palette.boxBorderRadius,
    },
    items: {
        color: theme.palette.grey[400],
        [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: theme.spacing(2),
    },
}));

export default useStyles;
