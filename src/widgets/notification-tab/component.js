import {
    Box, FormHelperText, Button, FormControlLabel, Checkbox,
} from '@material-ui/core';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import style from './style';

function NotificationTab(props) {
    const classes = style();
    const { register, handleSubmit, errors } = useForm();
    return (
        <form className={classes.form}>
            <Box fontSize={18} fontWeight={500}>
                <FormattedMessage id="form.newsletter_tab_title" />
            </Box>
            <Box marginBottom={4}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            icon={<CircleUnchecked className={classes.icon} />}
                            checkedIcon={<CircleChecked className={classes.icon} />}
                        />
                    )}
                    label={<FormattedMessage id="form.newsletter_tab" />}
                    inputRef={register}
                    name="newsletter"
                    id="newsletter"
                    required
                />
                <FormHelperText>Lorem ipsum dolor sit amet, tempor incididunt ut labore et.</FormHelperText>
            </Box>
            <Box fontSize={18} fontWeight={500}>
                <FormattedMessage id="form.sessions_tab" />
            </Box>
            <Box marginBottom={2}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            icon={<CircleUnchecked className={classes.icon} />}
                            checkedIcon={<CircleChecked className={classes.icon} />}
                        />
                    )}
                    label={<FormattedMessage id="form.checkbox_tab" />}
                    inputRef={register}
                    name="sessions"
                    id="session"
                    required
                />
                <FormHelperText>Lorem ipsum dolor sit amet, tempor incididunt ut labore et.</FormHelperText>
            </Box>
            <Button type="submit" variant="contained" color="primary" className={classes.form_btn}>
                <FormattedMessage id="form.btn.save" size="large" />
            </Button>
        </form>
    );
}

NotificationTab.propTypes = {

};

export default NotificationTab;
