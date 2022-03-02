import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    Banner: (props) => ({
        height: props.size,
        position: 'relative',
    }),
    media: {
        backgroundColor: 'white',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: '300ms',
        cursor: 'pointer',
        '&:hover':
        {
            filter: 'brightness(115%)',
        },
    },
    MediaCaption: {
        textOverflow: 'ellipsis',

        position: 'absolute',
        bottom: 0,

        padding: '15px',

        backgroundColor: 'black',
        color: 'white',
        opacity: '0.6',

        width: '100%',
        height: '10%',
        '&:hover':
            {
                opacity: '0.8',
            },
    },
    BannerGrid:
    {
        height: '100%',
        position: ' relative',
    },
    Content:
    {
        color: 'white',
        backgroundColor: 'red',
        height: '100%',

        position: 'relative',

        cursor: 'pointer',

        padding: '30px',

        transition: '300ms',
        '&:hover, &:active':
        {
            backgroundColor: 'black',
        },
    },
    Title:
        {
            fontWeight: 500,
        },

    Caption:
        {
            marginTop: '10px',
        },

    ViewButton:
        {
            marginTop: '40px',
            color: 'white',
            border: '3px solid white',
            textTransform: 'capitalize',

            transition: '200ms',
        },

}));

export default useStyles;
