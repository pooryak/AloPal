import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        maxWidth: '100%',
        width: '100%',
    },
    container: {
        maxWidth: '100%',
        margin: theme.spacing(1, 0),
        overflowX: 'hidden',
        width: '100%',
    },
    me: {
        // backgroundColor: theme.palette.white,
        background: '#007aff',
        color: 'white',
        marginLeft: theme.spacing(1),
        padding: theme.spacing(2, 2),
        // border: '1px solid #000',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '2px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        flexWrap: 'wrap',
        maxWidth: '90%',
        overflowWrap: 'break-word',
    },
    him: {
        // backgroundColor: theme.palette.white,
        background: '#f4f4f8',
        color: '#000',
        marginRight: theme.spacing(1),
        padding: theme.spacing(2, 2),
        // border: '1px solid #000',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '2px',
        flexWrap: 'wrap',
        maxWidth: '90%',
        overflowWrap: 'break-word',
    },
}));

export default useStyles;
