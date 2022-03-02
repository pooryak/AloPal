import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            flexBasis: '42%',
            marginBottom: theme.spacing(2),
        },
    },
    img: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));

export default useStyle;
