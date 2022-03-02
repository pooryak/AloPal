import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.white,
        display: 'flex',
        width: '100%',
        padding: theme.spacing(1, 2),
        '& .MuiInputBase-root': {
            backgroundColor: theme.palette.white,
        },
        '& $form': {
            width: '100%',
        },
    },
}));

export default useStyles;
