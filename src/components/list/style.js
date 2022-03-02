import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    divider: {
        display: 'flex',
        width: 'clamp(2%,8.3%,20%)',
    },
}));

export default useStyle;
