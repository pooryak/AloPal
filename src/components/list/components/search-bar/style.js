import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.thirdinary[300],
        padding: theme.spacing(2, 1),
        borderRadius: '4px',
        display: 'flex',
        flex: 1,
    },
    search_field_container: {
        flex: 3,
    },
    search_btn_container: {
        flex: 1,
        marginLeft: theme.spacing(2),
        '& $button': {
            height: '100%',
            width: '100%',
        },
    },
    search_field: {
        width: '100%',
    },
    search_middle: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(2, 0),
    },
    chip: {
        margin: theme.spacing(1),
    },
    form_row: {
        width: '100%',
        '& .MuiFormControl-root': {
            width: '100%',
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
