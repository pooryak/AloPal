import {
    TextField, Radio, RadioGroup,
    FormControlLabel, FormControl, FormLabel,
    InputLabel, Select, MenuItem,
} from '@material-ui/core';
import { useMutation } from 'react-query';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ApiProfessionAllRepository } from 'repository';
import constants from 'constants.js';
import decoder from 'compiled';
import style from './style';

function SpecialityInfoFields(props) {
    const {
        register, selectValue, errors, control,
    } = props;
    const [listData, setData] = useState([]);
    
    const getProfessions = useMutation((user) => ApiProfessionAllRepository.apiProfessionAllPost(user), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.ListAllProfessionResponse.decode(data.data);
            setData(decodedData.professions);
        },
        onError: (error) => {
            console.log('🚀 ~ file: component.js ~ line 26 ~ registerMutation ~ error', error);
            const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });

    const fetchApi = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: 'tokenStatus.token.token',
                },
            },
        };
        const verify = decoder.alopal.backend.services.ListAllProfessionsRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.ListAllProfessionsRequest.encode(verify).finish();
        const datacv = await getProfessions.mutateAsync(encodedData);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const classes = style();
    return (
        <div className={classes.form}>
            <Controller
                name="field"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                    <FormControl
                        name="field"
                        required
                    >
                        <FormLabel component="legend"><FormattedMessage id="form.i_am" /></FormLabel>
                        <RadioGroup
                            id="field"
                            value={Number(value)}
                            defaultChecked={2}
                            onChange={(e) => onChange(e.target.value)}
                            inputRef={register({ required: true })}
                            aria-label="field"
                            name="field"
                            className={classes.titles}
                        >
                            {
                                listData.map((item) => (<FormControlLabel value={item.id.value} control={<Radio />} label={item.name} />))
                            }
                        </RadioGroup>
                    </FormControl>
                )}
            />
            <Controller
                name="highest_degree"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                    <FormControl variant="outlined" component="fieldset" name="degree" required className={classes.formControl}>
                        <InputLabel id="select-degree"><FormattedMessage id="form.highest_degree" /></InputLabel>
                        <Select
                            labelId="select-degree"
                            id="select-degree"
                            label={<FormattedMessage id="form.highest_degree" />}
                            name="degree"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            displayEmpty
                        >
                            {
                                constants.degrees.map((item) => (
                                    <MenuItem value={item.value} key={item.value}>
                                        <FormattedMessage id={item.title} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                )}
            />
            {
                selectValue === 'Psychtherapist' && (
                    <Controller
                        name="degree"
                        control={control}
                        rules={{ required: true }}
                        render={({ onChange, value }) => (
                            <FormControl variant="outlined" required className={classes.formControl}>
                                <InputLabel id="select-field"><FormattedMessage id="form.field_of_study" /></InputLabel>
                                <Select
                                    labelId="select-degree"
                                    id="select-field"
                                    label={<FormattedMessage id="form.field_of_study" />}
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Medicine</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />

                )
            }
            <Controller
                name="speciality"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                    <FormControl name="speciality" variant="outlined" required className={classes.formControl}>
                        <InputLabel id="select-speciality"><FormattedMessage id="form.speciality" /></InputLabel>
                        <Select
                            labelId="select-speciality"
                            id="select-speciliaty"
                            label={<FormattedMessage id="form.speciliaty" />}
                            name="speciality"
                            displayEmpty
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                        >
                            {
                                constants.speciality.map((item) => (
                                    <MenuItem value={item.value} key={item.value}>
                                        <FormattedMessage id={item.title} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                )}
            />

            {
                selectValue === 'psychtherapist' && (
                    <TextField
                        inputRef={register({ required: true })}
                        id="outlined-university"
                        label={<FormattedMessage id="form.university" />}
                        type="text"
                        name="university"
                        autoComplete="university"
                        variant="outlined"
                    />
                )
            }
            <TextField
                inputRef={register({ required: true })}
                id="outlined-university"
                label={<FormattedMessage id="form.university" />}
                type="text"
                name="university"
                autoComplete="university"
                variant="outlined"
                required
            />
            <TextField
                inputRef={register({ required: true })}
                id="outlined-latest"
                label={<FormattedMessage id="form.latest_position" defaultMessage="National Code" />}
                type="text"
                name="latest_position"
                autoComplete="latest_position"
                variant="outlined"
                required
            />
            <TextField
                inputRef={register({ required: true })}
                id="outlined-years-experience"
                label={<FormattedMessage id="form.experience" defaultMessage="Email" />}
                type="number"
                name="experience"
                autoComplete="experience"
                variant="outlined"
                required
            />
            <Controller
                name="english_level"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) => (
                    <FormControl variant="outlined" required className={classes.formControl}>
                        <InputLabel id="select-english-level"><FormattedMessage id="form.english_level" /></InputLabel>
                        <Select
                            labelId="select-english-level"
                            id="select-english-level"
                            label={<FormattedMessage id="form.english-level" />}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                        >
                            {
                                constants.english_level.map((item) => (
                                    <MenuItem value={item.value} key={item.value}>
                                        <FormattedMessage id={item.title} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                )}
            />

        </div>
    );
}

SpecialityInfoFields.propTypes = {
    register: PropTypes.object.isRequired,
    control: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    selectValue: PropTypes.string.isRequired,
};

export default SpecialityInfoFields;
