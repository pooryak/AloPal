/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const {
    paramCase,
} = require('change-case');
const createRequestGroupFile = require('./create-request-group-file');

const createCollectionTreeV2 = async (
    treeMap, destPath, requestGroupTemplate, indexTemplate) => {
    // console.log('\n\n\n createCollectionTreeV2 => treeMap -> ', requestGroupTemplate,"requestGroupTemplate");
    try {
        // eslint-disable-next-line guard-for-in
        for (const key in treeMap) {
            const paramCaseName = paramCase(key);
            // create function for each key
            await createRequestGroupFile(destPath, paramCaseName,
                { name: key, value: treeMap[key] },
                requestGroupTemplate, true);
        }
    } catch (e) {
        console.log(' \n\n\n  e -> createCollectionTreeV2 => treeMap -> ',
            destPath);
        console.log(' createCollectionTreeV2 => e -> ', e);
    }
};

module.exports = createCollectionTreeV2;
