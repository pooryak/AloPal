import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 145,
        textAlign: 'center',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(2, 1),
        cursor: 'pointer',
        margin: theme.spacing(1),
        transition: theme.transitions.create(['background', 'box-shadow'], {
            duration: theme.transitions.duration.complex,
        }),
        '&:hover': {
            boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
        },
    },
    duration: {
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: theme.spacing(0.5),
    },
}));

export default useStyles;
