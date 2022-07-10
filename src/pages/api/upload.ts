import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import { randomUUID } from "crypto";
import { getDownloadURL } from "firebase/storage";

// Import Utils
import { uploadImage } from "../../utils/uploadImage";

interface NextConnectApiRequest extends NextApiRequest {
    file: Express.Multer.File;
}

// Init Multer
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    }
});

const apiRoute = nextConnect({
    // Handle Errors
    onError: (error, req: NextConnectApiRequest, res: NextApiResponse) => {
        return res.status(501)
            .json({
                statusCode: 501,
                error: "Not Implemented",
                message: error.message,
            });
    },
    // Handle any other request
    onNoMatch: (req: NextConnectApiRequest, res: NextApiResponse) => {
        return res.status(405)
            .json({
                statusCode: 405,
                error: "Method Not Allowed",
                message: `Method '${req.method}' not allowed`,
            })
    }
});

// Upload a File
apiRoute.use(upload.single("file"));

// Handle Upload
apiRoute.post(async (req: NextConnectApiRequest, res: NextApiResponse) => {
    await uploadImage(randomUUID(), req.file!)
        .then((url) => {
            setTimeout(async () => {
                return await getDownloadURL(url);
            }, 10000)
        })
        .catch((error: Error) => {
            throw error;
        });
});

export default apiRoute;