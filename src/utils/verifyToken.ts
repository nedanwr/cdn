import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    // Get token from header
    const bearerHeader: string | undefined = req.headers["authorization"];

    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer: string[] = bearerHeader.split(" ");
        // Get token from array
        const bearerToken: string = bearer[1];
        // Check if token is valid
        jwt.verify(bearerToken, process.env.JWT_SECRET_KEY!, (error: any, decoded: any) => {
            if (error)
                return res.status(403)
                    .json({
                        statusCode: 403,
                        error: "Forbidden",
                        message: "You are not authorized to access this resource."
                    });

            // Check if user with secret key in token exists

            next();
        });
    }
}