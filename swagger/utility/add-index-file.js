const fs = require('fs');
const {
    camelCase, pascalCase, snakeCase, paramCase,
} = require('change-case');
const { COLLECTION_POSTFIX } = require('../constans');

const addIndexFile = async (indexTemplate, path, stackNames, isRepo = false) => {
    const convertedNames = stackNames.reduce((acc, item) => {
        const camelName = camelCase(item.replace(' ', ''));
        const pascalName = pascalCase(item.replace(' ', ''));
        const paramName = paramCase(item.replace(' ', ''));

        return {
            ...acc,
            [isRepo
                ? `${pascalName}${COLLECTION_POSTFIX}`
                : camelName]: paramName,
        };
    }, {});

    const contents = indexTemplate({
        dirOrFile: convertedNames,
    });

    return await fs.writeFile([path, 'index.js'].join('/'), contents, (err) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("\n addIndexFile successfully -> ", path);
            // console.log("\n\n");
        }
    });
};

module.exports = addIndexFile;
