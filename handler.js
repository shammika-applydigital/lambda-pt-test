const Artillery = require('artillery-core');

exports.handler = async (event) => {
    const testFile = './performance-test.yml';
    const results = await Artillery.run(testFile);
    return {
        statusCode: 200,
        body: JSON.stringify(results)
    };
};
