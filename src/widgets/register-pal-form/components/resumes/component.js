import {
    TextField, Radio, RadioGroup,
    FormControlLabel, FormControl, FormLabel,
    Grid, InputLabel, Select, MenuItem, Avatar,
    Button,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useToken } from 'src/utility/hooks';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ApiProfileServiceCurrentRepository } from 'repository';
import decoder from 'compiled';
import style from './style';

function UploadFormatCustom(props) {
    const {
        avatar, name, register,
    } = props;
    const classes = style();

    return (
        <div className={classes.input}>
            <label htmlFor="contained-button-file" className={classes.label}>
                {
                    avatar
                && <Avatar />
                }
                <Button variant="contained" color="secondary"><FormattedMessage id="form.upload_image" /></Button>
                <input
                    ref={register}
                    accept="image/*"
                    className={classes.input}
                    id={name}
                    multiple
                    type="file"
                    name={name}
                    // onChange={handleUpload}
                />
            </label>
        </div>
    );
}
UploadFormatCustom.propTypes = {
    register: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

function RadioFormatCustom(props) {
    const {
        register, handleChange, selectedTeach,
    } = props;
    const classes = style();

    return (
        <RadioGroup aria-label="title" name="teach" className={classes.titles} value={selectedTeach} onChange={handleChange}>
            <FormControlLabel value="Farsi" control={<Radio />} label={<FormattedMessage id="form.teacher.farsi" />} />
            <FormControlLabel value="Foreign_Language" control={<Radio />} label={<FormattedMessage id="form.teacher.foreign" />} />
            {
                selectedTeach === 'Foreign_Language' && (
                    <TextField
                        inputRef={register({ required: true })}
                        id="outlined-language"
                        label={<FormattedMessage id="form.language" />}
                        type="text"
                        name="language"
                        autoComplete="language"
                        variant="outlined"
                        required
                        InputLabelProps={{ shrink: true }}
                        placeholder="eg. English / French / Arabic / ..."
                    />
                )
            }
            <FormControlLabel value="Art" control={<Radio />} label={<FormattedMessage id="form.teacher.art" />} />
            <FormControlLabel value="Music" control={<Radio />} label={<FormattedMessage id="form.teacher.music" />} />
            <FormControlLabel value="Development" control={<Radio />} label={<FormattedMessage id="form.teacher.development" />} />
            <FormControlLabel value="Other" control={<Radio />} label={<FormattedMessage id="form.gender.other" />} />
        </RadioGroup>
    );
}
RadioFormatCustom.propTypes = {
    register: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    selectedTeach: PropTypes.string.isRequired,
};

function Resumes(props) {
    const {
        register, selectedField, handleChange, selectedTeach, profileServiceData,
    } = props;
    const classes = style();
    const tokenStatus = useToken();

    const profileServiceApi = useMutation((user) => ApiProfileServiceCurrentRepository.apiProfileServiceCurrentPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.GetCurrentServiceProfileResponse.decode(apiData.data);
            profileServiceData(decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.error('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });

    const fetchApi = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
        };
        const verify = decoder.alopal.backend.services.GetCurrentServiceProfileRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.GetCurrentServiceProfileRequest.encode(verify).finish();
        const datacv = await profileServiceApi.mutateAsync(encodedData);
    };

    useEffect(() => {
        if (tokenStatus?.token?.token) {
            fetchApi();
        }
    }, [tokenStatus.token]);


    return (
        <div className={classes.form}>
            <TextField
                label={<FormattedMessage id="form.Your_image" />}
                inputRef={register({ required: true })}
                // onChange={handleChange}
                name="avatar"
                id="formatted-numberformat-input"
                variant="outlined"
                InputProps={{
                    inputComponent: () => (
                        <UploadFormatCustom
                            avatar
                            handleChange={handleChange}
                            name="avatar"
                            register={register}
                        />
                    ),
                }}
                InputLabelProps={{ shrink: true }}
            />
            {
                selectedField === 'Tutor' && (
                    <TextField
                        label={<FormattedMessage id="form.tutor_teach" />}
                        // value={values.numberformat}
                        // onChange={handleChange}
                        name="numberformat"
                        id="formatted-numberformat-input"
                        variant="outlined"
                        InputProps={{
                            inputComponent: () => (
                                <RadioFormatCustom
                                    register={register}
                                    handleChange={handleChange}
                                    selectedTeach={selectedTeach}
                                />
                            ),
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                )
            }
            {
                selectedField !== 'Tutor' && (
                    <TextField
                        inputRef={register({ required: true })}
                        id="outlined-council-no"
                        label={<FormattedMessage id="form.council" defaultMessage="Email" />}
                        type="number"
                        name="councilNo"
                        autoComplete="experience"
                        variant="outlined"
                        required
                    />
                )
            }

            {
                selectedField === 'Medical_Specialist' && (
                    <TextField
                        label={<FormattedMessage id="form.medical_council_membership" />}
                        // value={values.numberformat}
                        // onChange={handleChange}
                        id="formatted-numberformat-input"
                        variant="outlined"
                        InputProps={{
                            inputComponent: () => <UploadFormatCustom handleChange={handleChange} name="medical_council" />,
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                )
            }
            {
                selectedField !== 'Tutor' && (
                    <TextField
                        label={<FormattedMessage id="form.council_membership" />}
                        // value={values.numberformat}
                        // onChange={handleChange}
                        id="formatted-numberformat-input"
                        variant="outlined"
                        InputProps={{
                            inputComponent: () => <UploadFormatCustom handleChange={handleChange} name="council_membership" />,
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                )
            }

            {
                selectedField === 'Psychtherapist' && (
                    <TextField
                        label={<FormattedMessage id="form.degree_image" />}
                        id="formatted-numberformat-input"
                        variant="outlined"
                        InputProps={{
                            inputComponent: () => <UploadFormatCustom handleChange={handleChange} name="degree" />,
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                )
            }

            <TextField
                label={<FormattedMessage id="form.cv_image" />}
                id="formatted-numberformat-input"
                inputRef={register({ required: true })}
                variant="outlined"
                name="cv"
                InputProps={{
                    inputComponent: () => <UploadFormatCustom handleChange={handleChange} name="cv" register={register} />,
                }}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label={<FormattedMessage id="form.certificates_image" />}
                id="formatted-numberformat-input"
                variant="outlined"
                InputProps={{
                    inputComponent: () => <UploadFormatCustom handleChange={handleChange} name="certificates" register={register} />,
                }}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label={<FormattedMessage id="form.awards_image" />}
                // value={values.numberformat}
                // onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                variant="outlined"
                InputProps={{
                    inputComponent: () => <UploadFormatCustom handleChange={handleChange} name="awards" register={register} />,
                }}
                InputLabelProps={{ shrink: true }}
            />
        </div>
    );
}
Resumes.propTypes = {
    register: PropTypes.object.isRequired,
    selectedField: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    selectedTeach: PropTypes.string.isRequired,
    profileServiceData: PropTypes.func.isRequired,
};

export default Resumes;
