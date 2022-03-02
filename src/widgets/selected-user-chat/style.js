import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2, 2),
        cursor: 'pointer',
        backgroundColor: theme.palette.grey[300],
        borderRadius: theme.spacing(1, 0, 0, 1),
    },
    txt: {
        maxWidth: '50ch',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginLeft: theme.spacing(1.5),
    },
    desc: {
        maxWidth: '50ch',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
}));

export default useStyle;
