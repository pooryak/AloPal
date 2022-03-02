import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    info_box: {
        // backgroundColor: theme.palette.thirdinary[300],
        // textAlign: 'left',
        borderRadius: '5px',
        padding: theme.spacing(2, 0),
        color: theme.palette.success.main,
    },
    header_title: {
        color: theme.palette.primary.main,
        marginTop: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        marginTop: theme.spacing(3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.common.white,
            width: '100%',
            borderRadius: theme.spacing(),
            [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: 0,
        },
        '& .MuiFilledInput-root': {
            backgroundColor: 'unset',
        },
        '& .react-datepicker-wrapper': {
            width: '100%',
            padding: theme.spacing(2),
        },
        '& .react-datepicker__input-container': {
            width: '100%',
            '& input': {
                border: 'none',
                backgroundColor: 'transparent',
                width: '100%',
            },
        },
        '& .react-datepicker-ignore-onclickoutside': {
            border: 'none',
            backgroundColor: 'transparent',
            width: '100%',
        },
        '& .react-datepicker-popper': {
            zIndex: 2,
        },
        '& .MuiFormLabel-asterisk': {
            color: theme.palette.secondary.main,
        },
        '& .css-11hpcgx-control': {
            border: 'unset',
            color: 'rgba(0, 0, 0, 0.54)',
            '& $svg': {
                color: theme.palette.secondary.main,
            },
        },
        '& .css-11hpcgx-control:hover': { background: 'unset' },
        '& .css-2b097c-container': {
            zIndex: 10,
        },
        '& .MuiSelect-icon': {
            color: theme.palette.secondary.main,
        },
        '& .MuiFormControlLabel-label': {
            color: theme.palette.primary.main,
        },
    },
    timeZone_wrapper: {
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.spacing(),
        '& .MuiFormControl-root': {
            paddingTop: '25px',
            paddingRight: '12px',
            paddingBottom: '8px',
            paddingLeft: '12px',
        },
        margin: theme.spacing(1, 0),
        // [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: 0,
    },
    form_row: {
        margin: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: 0,
    },
    formControl: {
        // margin: 'unset !important',
        // width: 'unset !important',
        minWidth: '40% !important',
        backgroundColor: theme.palette.common.white,
        border: 'unset',
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    available_avatar: {
        margin: theme.spacing(),
        cursor: 'pointer',
    },
    form_btn: {
        margin: theme.spacing(2, 'auto'),
        borderRadius: theme.spacing(4),
        fontWeight: 700,
        color: theme.palette.common.white,
        padding: theme.spacing(1, 3),
        justifySelf: 'center',
        width: '80%',
    },
    input: {
        position: 'relative',
        display: 'inline-block',
        padding: theme.spacing(1.5, 2),
        alignItems: 'center',
        alignSelf: 'stretch',
        width: '100%',
        '& $input': {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            width: '100%',
            height: '100%',
        },
        '& $button': {
            borderRadius: theme.spacing(4),
            fontWeight: 700,
        },
    },
    divider: {
        display: 'flex',
        marginTop: theme.spacing(1),
        justifyContent: 'center',
        alignContent: 'center',
        '& $hr': {
            height: '1px',
            alignSelf: 'center',
            width: '100%',
            borderColor: theme.palette.secondary.main,
        },

    },
    divider_itm: {
        display: 'flex',
    },
    label: {
        margin: theme.spacing(2, 0),
        marginRight: theme.spacing(1),
        display: 'flex',
        alignSelf: 'stretch',
        '& $button': {
            marginLeft: theme.spacing(1),
            height: theme.spacing(4),
            alignSelf: 'center',
        },
        '& .MuiAvatar-root': {
            width: '60px',
            height: '60px',
        },
    },
    icon: {
        color: theme.palette.secondary.main,
    },
    checkbox_label: {
        color: theme.palette.primary.dark,
    },
}));

export default useStyle;
