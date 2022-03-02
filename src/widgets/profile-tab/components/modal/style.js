import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        width: '50%',
        top: '50%',
        left: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        maxHeight: '90vh',
        transform: 'translate(-50%, -50%)',
        padding: theme.spacing(2, 2),
        boxShadow: theme.shadows[5],
        msOverflowY: 'auto',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    img_container: {
        position: 'relative',
        // paddingTop: 'calc((74/165)*100%)',
    },
    form: {
        // width: '80%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': {
            width: '90%',
            // [`margin${theme.direction.direction === 'rtl' ? 'Left' : 'Right'}`]: 0,
            backgroundColor: theme.palette.grey[300],
            borderRadius: theme.spacing(),
            // maxWidth: '45ch',
            [theme.breakpoints.down('sm')]: {
                maxWidth: 'unset',
            },
        },
        // '& $label+.MuiInput-root': {
        //     margin: theme.spacing(1.2, 0),
        // },
        '& $label': {
            paddingLeft: theme.spacing(),
        },
        '& .MuiFilledInput-root': {
            backgroundColor: 'unset',
        },
        '& .MuiFilledInput-input': {
            paddingTop: '25px',
        },
        '& .MuiButton-root': {
            padding: theme.spacing(0.8, 6),
            borderRadius: theme.spacing(2),
            color: theme.palette.common.white,
            justifySelf: 'center',
        },

    },
    link: {
        color: theme.palette.aloPal.blue,
    },
}));

export default useStyle;
