import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    container: {
        backgroundColor: theme.palette.common.white,
        padding: theme.spacing(2, 2.5),
        borderRadius: '10px',
        display: 'flex',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'spac-betwen',
            marginTop: theme.spacing(1),
        },
    },
    search_field_container: {
        flex: 3,
    },
    search_btn_container: {
        flex: 1,
        [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: theme.spacing(2),
        '& $button': {
            height: '100%',
            width: '100%',
            color: theme.palette.common.white,
            borderRadius: '40px',
            fontSize: theme.typography.pxToRem(18),
            fontWeight: 600,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2),
            [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: 0,
            alignSelf: 'center',
            width: '90%',
        },
    },
    search_field: {
        width: '100%',
    },
    search_middle: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(2, 0),
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-between',
        },
    },
    counter_data: {
        color: theme.palette.aloPal.dark,
        fontWeight: 700,
        fontSize: theme.typography.pxToRem(18),

    },
    chip: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.common.white,
        '& .MuiChip-deleteIcon:hover:hover': {
            color: theme.palette.secondary.main,
        },
    },
    form_row: {
        width: '100%',
        backgroundColor: theme.palette.common.white,
        '& $svg': {
            color: theme.palette.secondary.main,
        },
        minWidth: '9.2em',
        '& .MuiFormControl-root': {
            width: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            width: 'unset',
            flex: 1,
        },
    },
    card_container: {
        margin: theme.spacing(2, 0),
        justifyContent: 'space-between',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        width: '100%',
    },
}));

export default useStyle;
