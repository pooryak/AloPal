import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        width: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: theme.spacing(2, 2),
        boxShadow: theme.shadows[5],
    },
    button: {
        marginRight: theme.spacing(1),
    },
    cancel_btn: {
        borderRadius: theme.palette.boxBorderRadius,
        color: theme.palette.common.white,
    },
}));

export default useStyle;
