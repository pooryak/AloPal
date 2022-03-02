import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        borderRadius: '10px',
        padding: theme.spacing(2, 2),
        textOverflow: 'ellipsis',
        minHeight: '534px',
        '& .MuiFormControlLabel-root .MuiFormControlLabel-label': {
            color: theme.palette.aloPal.dark,
        },
    },
    filter: {
        color: theme.palette.aloPal.dark,
    },
    filter_icon: {
        color: theme.palette.secondary.main,
        marginRight: theme.spacing(1),
    },
    filter_clear: {
        fontSize: '11px',
    },
    filter_title: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.aloPal.dark,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    icon: {
        color: theme.palette.secondary.main,
    },
    labels_group: {
        overflow: 'hidden',
    },
    filter_option: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '100%',
        display: 'unset',
        '& .MuiFormControlLabel-label': {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    btn_remove: {
        textOverflow: 'ellipsis',
        '& $button': {
            fontSize: theme.typography.pxToRem(12),
            padding: theme.spacing(0.1, 1),
            borderRadius: theme.palette.boxBorderRadius,
            color: theme.palette.aloPal.blue,
            borderColor: theme.palette.aloPal.blue,
            textTransform: 'none',
        },
    },
}));

export default useStyle;
