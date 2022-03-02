import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        marginTop: theme.spacing(3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
            backgroundColor: theme.palette.grey[100],
            borderRadius: theme.spacing(),
            marginRight: 0,
            marginLeft: 0,
        },
        '& .MuiFilledInput-root': {
            backgroundColor: 'unset',
        },
        '& .MuiFilledInput-root $input': {
            color: `${theme.palette.aloPal.dark} !important`,
            // backgroundColor: 'unset',
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
        '& #dateTimePicker': {
            border: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            padding: theme.spacing(2),
        },
        '& .JDatePicker': {
            zIndex: 2,
        },
        '& .MuiSelect-icon': {
            color: theme.palette.secondary.main,
        },
        '& .MuiFormControlLabel-label': {
            color: theme.palette.primary.main,
        },
        '& .MuiNativeSelect-icon': {
            color: theme.palette.secondary.main,
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: theme.palette.secondary.main,
        },
        '& .Mui-focused $input': {
            color: theme.palette.aloPal.main,
        },
    },
    timeZone_wrapper: {
        backgroundColor: theme.palette.grey[100],
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
        // [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: 0,
        marginRight: 0,
        marginLeft: 0,
    },
    formControl: {
        minWidth: '40% !important',
        backgroundColor: theme.palette.common.white,
        border: 'unset',

    },
    country: {
        [`margin${theme.direction.direction === 'rtl' ? 'Left' : 'Right'}`]: `${theme.spacing()} !important`,
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    form_btn: {
        margin: theme.spacing(2, 'auto'),
        width: '40%',
        borderRadius: theme.palette.boxBorderRadius,
        color: theme.palette.common.white,
    },
    input_currency: {
        margin: theme.spacing(),
    },
}));

export default useStyle;
