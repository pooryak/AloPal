const {
          camelCase
      } = require('change-case');
const replaceQueryStrings = require(
    './replace-query-string'
);
const { HTTP_INSTANCE } = require('../constans');

const makeRequest = (requestObject) => {
    const camelName = camelCase(requestObject.name);

    const queryParams = requestObject.path_variable
        && requestObject.path_variable.reduce((acc, item) => [...acc, item.key],
            []);

    return {
        HTTP_INSTANCE,
        method: requestObject.method,
        name: camelName,
        query_params: queryParams && queryParams.join(' , '),
        query_url: replaceQueryStrings(queryParams,
            requestObject.absolute_url)
    };
};

module.exports = makeRequest;
