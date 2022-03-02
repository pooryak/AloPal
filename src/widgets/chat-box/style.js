import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.grey[300],
        borderRadius: theme.spacing(0, 1, 1, 1),
        display: 'flex',
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
        padding: theme.spacing(),
        maxWidth: '100%',
        flexWrap: 'wrap',
        overflowX: 'hidden',
    },
    root: {
        maxWidth: '100%',
        width: '100%',
    },
}));

export default useStyles;
