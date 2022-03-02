const fs = require('fs');
const path = require('path');
const makeRequestV2 = require('./make-request-v2');
const { HTTP_INSTANCE_IMPORT, HTTP_INSTANCE_DIR_NAME, IS_HTTP_INSTANCE_RELATIVE } = require('../constans');

const createRequestGroupFile = async (
    pathDire, fileName, requests, requestGroupTemplate, isV2 = false) => {
    let requestForTemplate = null;
    const newPath = path.relative(pathDire, 'src');
    requestForTemplate = await Object.keys(requests.value).map((item) => makeRequestV2({
        title: `${requests.name}_${item}`,
        name: item,
        value: requests.value[item],
        url: requests.name,
    }));

    let headerImporter = HTTP_INSTANCE_IMPORT;
    if (IS_HTTP_INSTANCE_RELATIVE) {
        headerImporter = HTTP_INSTANCE_IMPORT.replace(/\[path\]/, `${HTTP_INSTANCE_DIR_NAME}`);
    }
    const contents = requestGroupTemplate({
        HTTP_INSTANCE_IMPORT: headerImporter,
        requests: requestForTemplate,
    });

    return fs.writeFile(
        [pathDire, `${fileName}.js`].join('/'),
        contents,
        (err) => {
            if (err) {
                console.log(err);
            } else {
                // console.log("createRequestFile pathDire -> ", pathDire);
                // console.log("\n");
            }
        },
    );
};

module.exports = createRequestGroupFile;
