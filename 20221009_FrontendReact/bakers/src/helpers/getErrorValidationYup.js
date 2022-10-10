export const hasErrorsValidationYup = (errors) => {
    const hasErrors = errors.filter((el) => {
        if (el.errors.length) {
            return el.errors;
        }
        if (el.warnings.length) {
            return el.warnings;
        }
    });

    if (hasErrors && hasErrors.length) {
        return true;
    } else {
        return false;
    }
};
