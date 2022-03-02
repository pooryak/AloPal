import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        backgroundColor: 'fff',
        // minHeight: '80vh',
        padding: '50px 0',
    },
    txt_container: {
        alignContent: 'center',
        flexDirection: 'column',
    },
    service_title: {
        fontWeight: 'bold',
        marginLeft: '10px',
    },
    h2: {
        // fontSize: '36px',
        fontWeight: 'bold',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    services: {
        marginTop: theme.spacing(6),
        alignSelf: 'flex-end',
    },
}));

export default useStyle;
