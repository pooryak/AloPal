import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    list: {
        width: 250,
        backgroundColor: theme.palette.primary[300],
    },
    linkText: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: theme.palette.white,
    },
}));

export default useStyle;
