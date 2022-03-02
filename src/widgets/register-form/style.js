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
            // margin: theme.spacing(1),
            [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: 0,
            backgroundColor: theme.palette.common.white,
            borderRadius: theme.spacing(),
            // maxWidth: '45ch',
            [theme.breakpoints.down('sm')]: {
                maxWidth: 'unset',
            },
            width: '403px',
        },
        '& .MuiFilledInput-root': {
            backgroundColor: 'unset',
        },
        '& $label': {
            paddingLeft: theme.spacing(),
        },
        '& .MuiFilledInput-input': {
            paddingTop: '25px',
        },
    },
    icon: {
        color: theme.palette.secondary.main,
    },
    btn_ctn: {
        marginTop: theme.spacing(4),
        justifyContent: 'center',
        '& $button': {
            borderRadius: theme.spacing(4),
            color: theme.palette.common.white,
            padding: theme.spacing(1.2, 8),
        },
    },
    conditions_btn: {
        fontSize: theme.typography.pxToRem(14),
        color: theme.palette.aloPal.dark,
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
    temrs_link: {
        textDecoration: 'underline',
        fontWeight: 500,
    },
    form_privacy: {
        fontSize: '12px',
        color: '#4A4A4A',
        marginBottom: theme.spacing(2),
    },
}));

export default useStyle;
