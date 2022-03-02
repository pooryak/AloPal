import {
    Box, TextField, InputAdornment, IconButton,
} from '@material-ui/core';
import { useRef } from 'react';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';
import style from './style';

function Footer(props) {
    const classes = style();
    const inputRef = useRef();
    const { handleSubmit } = props;
    const handleText = (e) => {
        e.preventDefault();
        handleSubmit(inputRef.current.value);
        inputRef.current.value = '';
    };
    return (
        <Box display="flex" alignSelf="flex-end" className={classes.root}>
            <form noValidate autoComplete="off" onSubmit={handleText}>
                <TextField
                    id="outlined-full-width"
                    style={{ margin: 8 }}
                    placeholder="Placeholder"
                    inputRef={inputRef}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                type="submit"
                                // onClick={handleSubmit}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                <SendIcon />
                            </IconButton>
                                      </InputAdornment>,
                    }}
                />
            </form>
        </Box>
    );
}

Footer.propTypes = {

};

export default Footer;
