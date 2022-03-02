import {
    useState, useCallback, useEffect, useContext,
} from 'react';
import { ServiceList, Container, UserContext } from 'src/components';
import decoder from 'compiled';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import Axios from 'axios';
import { Grid } from '@material-ui/core';

// TODO: suggestion: options should will be provided by backend
const options = [{
    name: 'filters.options.Psychotherapy',
    value: 'Psychotherapy',
    checked: false,
}, {
    name: 'filters.options.Psychoanalysis',
    value: 'Psychoanalysis',
    checked: false,
}, {
    name: 'filters.options.Sextherapy',
    value: 'Sex_therapy',
    checked: false,
}];

function Services() {
    const localInfo = useContext(UserContext);
    const [serviceData, setServiceData] = useState();
    const router = useRouter();
    const [data, setData] = useState([]);
    // TODO: fake API List of Pals
    const postData = useMutation(() => Axios.post('/allUsers'), {
        onSuccess: (apiData) => {
            setData(apiData.data.people);
        },
        onError: (error) => {
            console.error('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });
    const fetchUsers = useCallback(async () => {
        // Todo: backend: it doesn't need context (public API)
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: 'tokenStatus.token.token',
                },
            },
        };
        const verify = decoder.alopal.backend.ContactMessageRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.ContactMessageRequest.encode(verify).finish();
        await postData.mutateAsync(encodedData);
    }, []);
    const getServices = useMutation((item) => Axios.post('/base/services', item), {
        onSuccess: (apiData) => {
            console.log('🚀 ~ file: index.js ~ line 47 ~ getServices ~ apiData', apiData);
            setServiceData(apiData.data.service);
        },
        onError: (error) => {
            console.error('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', error);
        },
    });
    /* TODO: fake API Passing language and sevice name from query to api to get service details
        I reckon it's better to call this api at build time
    */
    const fetchServices = async () => {
        // Todo: backend: it doesn't need context (public API)
        // const dataWithContext = {
        //     requestContext: {
        //         bearer: {
        //             token: 'tokenStatus.token.token',
        //         },
        //     },
        // };
        // const verify = decoder.alopal.backend.ContactMessageRequest.create(dataWithContext);
        // const encodedData = decoder.alopal.backend.ContactMessageRequest.encode(verify).finish();
        await getServices.mutateAsync({ lang: localInfo.language, service: router.query.service });
    };
    useEffect(() => {
        fetchServices();
    }, []);
    return (
        <Container>
            <Grid container>
                <ServiceList
                    onFetch={fetchUsers}
                    data={data}
                    title={serviceData?.title}
                    imageSrc="/assets/image/Dummy.jpg"
                    filterOptions={options}
                    description={serviceData?.description}
                />
            </Grid>
        </Container>
    );
}

Services.propTypes = {

};

export default Services;
