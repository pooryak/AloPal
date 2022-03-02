import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(9, 2),
        // borderRadius: '10px',
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
            [`margin${theme.direction.direction === 'rtl' ? 'Left' : 'Right'}`]: 0,
            backgroundColor: theme.palette.common.white,
            borderRadius: theme.spacing(),
            // width: '90%',
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
            fontFamily: 'Roboto',
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: theme.typography.pxToRem(24),
            color: theme.palette.aloPal.shades[5],
        },
        '& .MuiFilledInput-root': {
            backgroundColor: 'unset',
        },
        '& .MuiFilledInput-input': {
            paddingTop: '25px',
        },
        '& .MuiFormControlLabel-root .MuiFormControlLabel-label': {
            fontFamily: 'Roboto',
            fontSize: theme.typography.pxToRem(18),
            color: theme.palette.aloPal.shades[6],
        },
    },
    icon: {
        color: theme.palette.secondary.main,
    },
    btn_ctn: {
        marginTop: theme.spacing(9),
        // width: '50%',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            // '& $button:first-child': {
            //     marginBottom: theme.spacing(1),
            // },
        },
    },
    forget_btn: {
        textTransform: 'unset',
        color: theme.palette.aloPal.blue,
        fontSize: theme.typography.pxToRem(20),
        fontFamily: 'Roboto',
    },
    login: {
        padding: theme.spacing(0.8, 8),
        borderRadius: theme.palette.boxBorderRadius,
        color: theme.palette.common.white,
        fontWeight: 600,
        fontSize: '20px',
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
            color: theme.palette.aloPal.dark,
        },

    },
    divider_itm: {
        display: 'flex',
        color: theme.palette.aloPal.dark,
        alignSelf: 'center',
    },
    btn_container: {
        padding: theme.spacing(5, 7),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(5, 4),
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        '& $button': {
            marginBottom: theme.spacing(2),
            // backgroundColor: theme.palette.common.white,
            width: '60%',
        },
    },
    btn_fb: {
        backgroundColor: '#4267B2',
        color: theme.palette.common.white,
    },
    btn_google: {
        backgroundColor: theme.palette.common.white,
    },
    icon_fb: {
        color: theme.palette.common.white,
        fontSize: '24px',
    },
    icon_google: {
        color: '#DB4437',
        fontSize: '24px',
    },
    footer_txt: {
        marginTop: theme.spacing(4),
        textAlign: 'center',
        color: '#666666',
        fontWeight: 600,
        fontSize: '30px',

    },
    footer_btn: {
        marginTop: theme.spacing(3),
        justifySelf: 'center',
        borderRadius: theme.spacing(4),
        padding: theme.spacing(1.1, 4),
        fontWeight: 700,
        color: theme.palette.aloPal.blue,
    },
    error: {
        color: theme.palette.errorf,
        marginBottom: theme.spacing(2),
    },
}));

export default useStyle;
