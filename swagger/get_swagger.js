const {
    addIndexFile,
    createCollectionTreeV2,
} = require('./utility');

const getSwagger = async ({
    swaggerData,
    requestTemplate,
    indexTemplate,
    requestGroupTemplate,
    outputPath,
// eslint-disable-next-line consistent-return
}) => {
    if (!swaggerData) {
        console.log('##--> getSwagger => need swagger data');
        return null;
    }

    try {
    // generate folders and files from collectionTree
        await createCollectionTreeV2(swaggerData.paths, outputPath,
            requestGroupTemplate, indexTemplate);

        const repoNames = await Object.keys(swaggerData.paths).map(
            (item) => item,
        );
        // const repoNames = ['api'];
        await addIndexFile(indexTemplate, outputPath, repoNames, true);
    } catch (e) {
        console.log('##-> getSwagger -> catch -> ', e);
    }
};

module.exports = getSwagger;
