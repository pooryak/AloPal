const { SERVER_URL } = require('../constans');
const findRequests = (parentId, REQUESTS) => {
  let tmp = [];

  // collect all request for current directory
  const filteredRequestsById = REQUESTS.filter(
    (req) => req.folder === parentId,
  );

  // create request object for current node and push to the stack
  filteredRequestsById.map((req) => {
    tmp.push({
      name: req.name,
      url: req.url,
      method: req.method.toLowerCase(),
      path_variable: req.pathVariableData,
      absolute_url: req.url.replace(SERVER_URL, ''),
      request: req,
    });
  });
  return tmp;
};

module.exports = findRequests;
