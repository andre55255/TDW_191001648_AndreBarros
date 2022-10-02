import dotenv from "dotenv";
dotenv.config();

export const auth = {
    secret: String(process.env.JWT_KEY),
    expires: "3h",
    audience: "NaqueleNaipaoTS",
    issuer: "NaqueleNaipaoTS"
}