import {
    Box, TextField, Button,
} from '@material-ui/core';
import { Container } from 'src/components';
import { RegisterBanner } from 'src/widgets';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import style from './style';

function SetPassword(props) {
    const classes = style();
    const { callSubmit } = props;
    const { register, handleSubmit, errors } = useForm();
    return (
        <Container>
            <Box display="flex">
                <RegisterBanner />
                <form className={classes.form} onSubmit={handleSubmit(callSubmit)}>
                    <TextField
                        inputRef={register({ required: true })}
                        id="outlined-password"
                        label={<FormattedMessage id="form.newpassword" />}
                        type="password"
                        name="new-password"
                        autoComplete="new-password"
                        variant="outlined"
                        required
                    />
                    <TextField
                        inputRef={register({ required: true })}
                        id="outlined-password-re"
                        label={<FormattedMessage id="form.retypePass" />}
                        type="password"
                        name="retypePass"
                        autoComplete="new-password"
                        variant="outlined"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.form_btn}>
                        <FormattedMessage id="form.btn.save" size="large" />
                    </Button>
                </form>
            </Box>

        </Container>
    );
}

SetPassword.propTypes = {

};

export default SetPassword;
