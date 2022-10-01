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

function validPasswordStrong(password) {
    // Mínimo de 6 e máximo de 8 caracteres, pelo menos uma 
    // letra maiúscula, uma letra minúscula, um número e um caractere especial
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    return reg.test(password); // Retorna true se valido
}

module.exports = { 
    buildResponse,
    getBasePath,
    validPasswordStrong
};