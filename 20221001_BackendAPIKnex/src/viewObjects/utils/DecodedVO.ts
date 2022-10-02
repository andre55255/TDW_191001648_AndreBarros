export interface DecodedVO {
    idUser: number,
    loginUser: string,
    roleId: number,
    roleName: string,
    iat?: number,
    exp?: number,
    aud?: string,
    iss?: string
};