import { useEffect, useState } from 'react';
import { Container } from 'src/components';
import { FormattedMessage } from 'react-intl';
import {
    Typography, Accordion, AccordionSummary, AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { ApiFaqListRepository, ApiFaqAddRepository } from 'repository';
import { makeStyles } from '@material-ui/styles';
import decoder from 'compiled';

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.aloPal.dark,
        fontSize: theme.typography.pxToRem(36),
        fontWeight: theme.typography.fontWeightBold,
    },
    root: {
        marginTop: theme.spacing(2),
        '& .MuiAccordion-root': {
            backgroundColor: 'unset',
            boxShadow: 'unset',
        },
        '& .heading': {
            color: theme.palette.aloPal.dark,
        },
        '& .Mui-expanded': {
            backgroundColor: theme.palette.common.white,
            borderRadius: theme.shape.borderRadius,
            '& .MuiAccordionSummary-content': {
                color: theme.palette.secondary.main,
            },
        },
        '& $svg': {
            color: theme.palette.secondary.main,
        },
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightMedium,
    },
    txt: {
        fontSize: theme.typography.pxToRem(20),
        color: theme.palette.grey[600],
    },
    '.Mui-expanded': {
        '& $p': {
            color: theme.palette.secondary.main,

        },
    },
}));

function FAQ(props) {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const callFaq = useMutation((user) => ApiFaqListRepository.apiFaqListPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.ListFAQResponse.decode(apiData.data);
            setData(decodedData?.faq);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
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
        const verify = decoder.alopal.backend.ListFAQRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.ListFAQRequest.encode(verify).finish();
        const datacv = await callFaq.mutateAsync(encodedData);
    };

    const callAdd = useMutation((user) => ApiFaqAddRepository.apiFaqAddPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.AddFAQResponse.decode(apiData.data);
            // setData(decodedData?.faq);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });

    const addFaq = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: 'tokenStatus.token.token',
                },
            },
            faq: {
                question: 'test',
                answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper neque et neque vulputate, vel porta felis aliquet. Aenean at ipsum scelerisque, faucibus elit ut, suscipit mauris. Nulla suscipit ullamcorper libero sed rutrum. Integer vestibulum metus et nibh pellentesque, eget commodo ex lobortis. Etiam fermentum aliquet lectus, viverra accumsan tortor laoreet eu. Donec dictum, lectus at eleifend mollis, felis lectus dictum ligula, non tincidunt nunc libero vitae lectus. Vivamus feugiat elementum egestas. In hac habitasse platea dictumst. Sed volutpat nibh ut turpis rhoncus, vitae rhoncus est consectetur. Nam congue imperdiet diam, sit amet gravida lorem suscipit vitae. Vestibulum sed pharetra tellus. Quisque congue ac orci vel maximus. Curabitur euismod lectus eu gravida feugiat. Nullam consectetur, felis id efficitur convallis, eros justo dapibus mauris, at auctor tortor nunc sed tellus. Ut pharetra dolor eros, ut maximus ante posuere ornare. Quisque feugiat velit nisi, ornare facilisis augue pellentesque quis.',
            },
        };
        const verify = decoder.alopal.backend.AddFAQRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.AddFAQRequest.encode(verify).finish();
        const callApi = await callAdd.mutateAsync(encodedData);
    };
    useEffect(() => {
        fetchApi();
        // addFaq();
    }, []);
    return (
        <Container>
            <Typography component="h1" className={classes.title}>
                <FormattedMessage id="faq.title" />

            </Typography>
            <div className={classes.root}>
                {
                    data.map((item) => (
                        <Accordion key={item.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>{item.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.txt}>
                                    {item.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </div>

        </Container>
    );
}

FAQ.propTypes = {

};

export default FAQ;
