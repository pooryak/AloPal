const {
    camelCase,
} = require('change-case');
const replaceQueryStrings = require(
    './replace-query-string',
);
const { HTTP_INSTANCE, SERVER_URL } = require('../constans');

const makeRequest = (requestObject) => {
    const camelName = camelCase(requestObject.title);
    const queryParams = requestObject.value.parameters
        && requestObject.value.parameters.filter(item=>item.in ==='path').reduce((acc, item) => [...acc, item.name],
            []);
    const { url } = requestObject;

    const query_url = replaceQueryStrings(queryParams, url.replace(SERVER_URL, ''));
    const method = requestObject.name;

    return {
        method,
        name: camelName,
        query_params: queryParams && queryParams.join(' , '),
        query_url,
        HTTP_INSTANCE,
    };
};

module.exports = makeRequest;
