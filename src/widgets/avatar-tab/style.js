import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    btn: {
        marginLeft: theme.spacing(2),
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
        '& $hr': {
            borderColor: theme.palette.secondary.main,
        },
    },
    avatar: {
        margin: theme.spacing(1, 1),
    },
    form_btn: {
        margin: theme.spacing(2, 'auto'),
        borderRadius: theme.palette.boxBorderRadius,
        color: theme.palette.common.white,
        width: '160px',
        marginTop: theme.spacing(4),
    },
    label: {
        marginTop: theme.spacing(1),
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
    input: {
        position: 'relative',
        display: 'inline-block',
        padding: theme.spacing(1.5, 2),
        alignItems: 'center',
        alignSelf: 'stretch',
        '& $input': {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            width: '100%',
            height: '100%',
        },
        '& $button': {
            borderRadius: theme.palette.boxBorderRadius,
            // color: theme.palette.common.white,
            padding: theme.spacing(2, 4),
        },
    },
}));

export default useStyle;
