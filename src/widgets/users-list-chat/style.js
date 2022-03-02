import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(0.5),
        cursor: 'pointer',
        backgroundColor: theme.palette.grey[300],
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
