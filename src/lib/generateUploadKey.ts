import { randomBytes } from "crypto";

export const generateUploadKey = () => {
    return randomBytes(64).toString("hex");
}