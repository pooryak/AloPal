import { useEffect, useState } from 'react';
import {
    Grid, Typography, Button, Stepper, Box, StepLabel, Step, Snackbar, Slide,
} from '@material-ui/core';
import axios from 'axios';
import { useAuth } from 'src/utility/contexts/auth';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import MuiAlert from '@material-ui/lab/Alert';
import { useMutation } from 'react-query';
import dayjs from 'dayjs';
import { date } from 'src/utility';
import PropTypes from 'prop-types';
import { useToken } from 'src/utility/hooks';
import {
    ApiProfileBaseAddRepository, ApiUserAddRepository, ApiProfileServiceAddRepository,
    ApiProfileServiceUpdateRepository, ApiUploadRequestLinkRepository,
} from 'repository';
import decoder from 'compiled';
import { BaseInfoFields, SpecialityInfoFields, Resumes } from './components';
import style from './style';

// console.log('🚀 ~ file: component.js ~ line 18 ~ decoder', decoder);

function getSteps() {
    return [1, 2, 2];
}

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

function RegisterPalForm(props) {
    const classes = style();
    const { verification, errorResult } = props;
    const router = useRouter();
    const auth = useAuth();
    const tokenStatus = useToken();
    console.log('🚀 ~ file: component.js ~ line 40 ~ RegisterPalForm ~ tokenStatus', tokenStatus);
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(false);
    const [snackStateSuccess, setSnackSuccess] = useState();
    const [baseProfile, setDataBaseProfile] = useState();
    const queryData = router.query;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const steps = getSteps();
    const {
        register, handleSubmit, errors, setError, watch, setValue, control,
    } = useForm();
    useEffect(() => {
        if (errorResult) {
            setError('name', {
                type: 'server',
                message: errorResult,
            });
        }
        register({ name: 'field' });
        register({ name: 'teach' });
        const datprof = {
            profession: {
                name: 'Tutor',
            },
            requestContext: {
                bearer: {
                    token: 'data',
                },
            },
        };
        const verify = decoder.alopal.backend.services.AddProfessionRequest.create(datprof);
        console.log('🚀 ~ file: component.js ~ line 33 ~ postProfile ~ verify', verify);
        const encodedData = decoder.alopal.backend.services.AddProfessionRequest.encode(verify).finish();
        // ApiProfessionAddRepository.apiProfessionAddPost(encodedData);
    }, [errorResult, register]);

    const uploadFile = async (data) => {
        const blob = data.value[0].slice(0, data.value[0].size);

        const newFile = new File([blob], data.key, { type: 'image' });
        const dataWithCaptcha = {
            requestContext: {
                bearer: {
                    token: 'tokenStatus.token.token',
                },
            },
        };
        const verify = decoder.alopal.backend.services.UploadLinkRequest.create(dataWithCaptcha);
        const encodedData = decoder.alopal.backend.services.UploadLinkRequest.encode(verify).finish();
        const response = await ApiUploadRequestLinkRepository.apiUploadRequestLinkPost(encodedData);
        const decodedData = decoder.alopal.backend.services.UploadLinkResponse.decode(response.data);
        const headers = {
            Key: decodedData.assetId,
        };
        const responsePost = await axios.put(decodedData.uploadLink, newFile, { headers });
        return { value: decodedData.assetId, key: data.key, infoType: 1 };
    };

    const profileServiceData = (data) => {
        setDataBaseProfile(data);
    };

    const updateServiceProfileApi = useMutation((user) => ApiProfileServiceUpdateRepository.apiProfileServiceUpdatePost(user), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.UpdateServiceProfileResponse.decode(data.data);
            setSnackSuccess(true);
            setTimeout(
                () => {
                    router.push('/');
                }, 3000,
            );
        },
        onError: (error) => {
            console.log(error, 'error');
        },
    });

    const updateServiceProfile = async (data) => {
        const verifyData = decoder.alopal.backend.services.UpdateServiceProfileRequest.create(data);
        const encodedData = decoder.alopal.backend.services.UpdateServiceProfileRequest.encode(verifyData).finish();
        const calling = await updateServiceProfileApi.mutateAsync(encodedData);
    };

    const setProfileApi = useMutation((user) => ApiProfileBaseAddRepository.apiProfileBaseAddPost(user), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.SetBaseProfileResponse.decode(data.data);
            console.log('🚀 ~ file: component.js ~ line 135 ~ setProfileApi ~ decodedData', decodedData);
            handleNext();
            // console.log('🚀 ~ file: component.js ~ line 22 ~ registerMutation ~ decodedData', decodedData);
        },
        onError: (error) => {
            console.log(error, 'error');
        },
    });

    const postProfile = async (data) => {
        console.log('🚀 ~ file: component.js ~ line 145 ~ postProfile ~ data', data);
        let links;
        if (data?.avatar?.length > 0) {
            links = await uploadFile(formData.avatar);
            console.log('🚀 ~ file: component.js ~ line 149 ~ postProfile ~ links', links);
        }
        // const [firstName, lastName] = formData.name.split(' ');
        const dataWithCaptcha = {
            profileData: {
                publiclyVisibleInfo: {
                    // nickName: formData,
                    profileImageId: 'https://miro.medium.com/max/390/1*FjkV9a9lcKTObyZIimDqyg.jpeg',
                    gender: formData.gender,
                },
                privateInformation: {
                    identification: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        dateOfBirth: {
                            time: dayjs(formData.dateOfBirth).format(),
                        },
                        nationalCode: {
                            value: formData.national_code,
                        },
                        country: {
                            value: formData.country,
                        },
                        province: {
                            value: formData.province,
                        },
                        city: {
                            value: formData.city,
                        },
                        address: {
                            value: formData.address,
                        },
                    },
                    communicationChannels: {
                        emailAddress: queryData.email,
                        phoneNumber: formData.phone,
                        skypeId: queryData.skypeId,
                    },
                },
                timeZone: formData.timeZone,
            },
            requestContext: {
                bearer: {
                    token: data,
                },
            },
        };
        const verify = decoder.alopal.backend.services.SetBaseProfileRequest.create(dataWithCaptcha);
        const encodedData = decoder.alopal.backend.services.SetBaseProfileRequest.encode(verify).finish();
        const datacv = await setProfileApi.mutateAsync(encodedData);
        const decodedData = decoder.alopal.backend.services.SetBaseProfileRequest.decode(datacv.data);
    };

    const newUserMutation = useMutation((encodedData) => ApiUserAddRepository.apiUserAddPost(encodedData[0]), {
        onSuccess: async (data, encodedData) => {
            try {
                await auth.signin({
                    username: encodedData[1].user.username,
                    password: encodedData[1].password,
                    rememberMe: encodedData[1].remember_me,
                }).then((res) => postProfile(res));
            } catch (error) {
                console.log(error, 'error82');
                const errResponse = decoder.alopal.backend.BareResponse.decode(error.response);
                console.log('🚀 ~ file: component.js ~ line 207 ~ onSuccess: ~ errResponse', errResponse);
            }
        },
        onError: (error) => {
            console.log(error, 'error88');
        },
    });

    const newUserService = useMutation((encodedData) => ApiProfileServiceAddRepository.apiProfileServiceAddPost(encodedData), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.SetServiceProfileResponse.decode(data.data);

            handleNext();
        },
        onError: (error) => {
            console.log(error.response, 'newUserService');
        },
    });

    const onSubmit = async (data) => {
        if (activeStep === 0) {
            const birthdayChecker = date.over18(data.dateOfBirth);
            if (!birthdayChecker) return setError('dateOfBirth', { type: 'manual', message: 'you are not over 18' }, true);
            if (data.password !== data.retypePass) return setError('retypePass', { type: 'manual', message: <FormattedMessage id="form.notSame" /> });
            setFormData(data);
            const passwordData = {
                requestContext: {
                    bearer: {
                        token: queryData.token,
                    },
                },
                user: {
                    username: queryData.email,
                    emailAddress: queryData.email,
                },
                password: data.password,
            };
            const verifyData = decoder.alopal.backend.RegisterUserRequest.create(passwordData);
            const encodedData = decoder.alopal.backend.RegisterUserRequest.encode(verifyData).finish();
            try {
                await newUserMutation.mutateAsync([encodedData, passwordData]);
            } catch (error) {
                console.error(error, 'error');
            }
        } else if (activeStep === 1) {
            Object.keys(data).forEach((key) => (data[key] === undefined ? delete data[key] : {}));
            const professionId = data.field;
            delete data.field;
            const newDate = [];
            const dataJH = Object.keys(data).map((item) => newDate.push({ key: item, value: data[item] }));
            const infos = Object.entries(data);
            tokenStatus.getToken();
            console.log(tokenStatus,"tokenStatus")
            const value = {
                requestContext: {
                    bearer: {
                        token: tokenStatus?.token?.token,
                    },
                },
                profile: {
                    serviceProfessionId: {
                        value: Number(professionId),
                    },
                    extraInfo: newDate,
                },
            };
            const verifyData = decoder.alopal.backend.services.SetServiceProfileRequest.create(value);
            const encodedData = decoder.alopal.backend.services.SetServiceProfileRequest.encode(verifyData).finish();
            try {
                await newUserService.mutateAsync(encodedData);
            } catch (error) {
                console.log('🚀 ~ file: component.js ~ line 288 ~ onSubmit ~ error', error);
                const errResponse = decoder.alopal.backend.BareResponse.decode(error.response);
                console.log('🚀 ~ file: component.js ~ line 275 ~ onSubmit ~ errResponse', errResponse);
            }
        } else if (activeStep === 2) {
            console.log('🚀 ~ file: component.js ~ line 143 ~ onSubmit ~ data', data);
            Object.keys(data).forEach((key) => (data[key] === undefined ? delete data[key] : {}));
            Object.keys(data).forEach((key) => (data[key]?.length === 0 ? delete data[key] : {}));
            const newData = [];
            const dataJH = Object.keys(data).map((item) => newData.push({ key: item, value: data[item] }));
            const imageLinks = await Promise.all(newData.map(async (el) => {
                const result = [];
                if (typeof el.value === 'object') {
                    const links = await uploadFile(el);
                    result.push(links);
                } else {
                    result.push(el);
                }
                return result;
            }));
            const flattedData = imageLinks.flat(Infinity);
            const newProfile = {
                ...baseProfile,
                requestContext: {
                    bearer: {
                        token: tokenStatus.token.token,
                    },
                },
                profile: { ...baseProfile.profile, credential: flattedData },
            };
            updateServiceProfile(newProfile);
        }
    };

    const handleSnackSuccess = () => {
        setSnackSuccess(false);
    };

    const selectedField = watch('field');
    const selectedTeach = watch('teach');

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <BaseInfoFields register={register} control={control} errors={errors} setValue={setValue} />;
            case 1:
                return (
                    <SpecialityInfoFields
                        selectValue={selectedField}
                        register={register}
                        control={control}
                        errors={errors}
                    />
                );
            case 2:
                return (
                    <Resumes
                        register={register}
                        selectedField={selectedField}
                        selectedTeach={selectedTeach}
                        profileServiceData={profileServiceData}
                    />
                );
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <Grid item xs={12} sm={6} className={classes.root}>
            <Snackbar
                open={snackStateSuccess}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={TransitionLeft}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackSuccess} severity="success">
                    Succesfully Updated
                </MuiAlert>
            </Snackbar>
            <Box fontWeight={700}>
                <Typography variant="h3">
                    <FormattedMessage id="register.pal.complete" defaultMessage="Complete Your Registration" />
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel className={classes.labels}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                {getStepContent(activeStep)}
                <Grid container xs={12} justifyContent="flex-end" className={classes.btn_ctn}>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div className={classes.buttons}>
                            <Button
                                disabled={activeStep === 0}
                                variant="outlined"
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                <FormattedMessage id="form.previous" />
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                                {activeStep === steps.length - 1 ? <FormattedMessage id="form.register" /> : <FormattedMessage id="form.next" />}
                            </Button>
                        </div>
                    )}
                </Grid>
            </form>
        </Grid>
    );
}

RegisterPalForm.propTypes = {
    verification: PropTypes.func.isRequired,
    errorResult: PropTypes.string.isRequired,
};

export default RegisterPalForm;
