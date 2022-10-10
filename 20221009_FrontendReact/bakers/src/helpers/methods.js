export const buildAuthorization = (token) => {
    return {
        authorization: "Bearer " + token,
    };
};
