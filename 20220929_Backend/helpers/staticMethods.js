const path = require("path");

const buildResponse = (success, message, object) => {
    return {
        success,
        message, 
        object
    }
};

function getBasePath() {
    const basepathAux = path.dirname(__dirname).split(path.sep);
    const basepath = basepathAux.join(path.sep);
    return basepath;
}

module.exports = { 
    buildResponse,
    getBasePath 
};