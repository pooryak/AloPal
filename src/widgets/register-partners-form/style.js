import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(9, 2),
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
    },
    img_ctn: {
        width: '300px',
        height: '270px',
        position: 'relative',
        alignSelf: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '45ch',
            [theme.breakpoints.down('sm')]: {
                width: '37ch',
            },
        },
    },
    btn_ctn: {
        marginTop: theme.spacing(4),
    },
    divider: {
        display: 'flex',
        marginTop: theme.spacing(5),
        justifyContent: 'center',
        alignContent: 'center',
        '& $hr': {
            height: '1px',
            alignSelf: 'center',
            width: '90%',
        },

    },
    divider_itm: {
        display: 'flex',
    },
    btn_container: {
        padding: theme.spacing(5, 7),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(5, 4),
        },
        display: 'flex',
        flexDirection: 'column',
        '& $button': {
            marginBottom: theme.spacing(2),
        },
    },
    footer_txt: {
        marginTop: theme.spacing(4),
        textAlign: 'center',
    },
    footer_btn: {
        marginTop: theme.spacing(3),
        justifySelf: 'center',
    },
}));

export default useStyle;
