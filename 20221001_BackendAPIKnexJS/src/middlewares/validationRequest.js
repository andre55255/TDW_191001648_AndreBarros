const { validationResult } = require("express-validator");
const { buildApiResponse } = require("../helpers/staticMethods");

const validationRequest = async (req, res, next) => {
    try {
        const schemaErrors = validationResult(req);
        if (!schemaErrors.isEmpty()) {
            const message = schemaErrors
                .array({ onlyFirstError: true })
                .map((err) => {
                    return err.msg;
                })
                .join(", ");
            return res.status(400).json(buildApiResponse(false, 400, message));
        }
    
        next();
    } catch (err) {
        logger
    }
};

module.exports = {
    validationRequest
}