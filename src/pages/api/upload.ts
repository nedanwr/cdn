import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";

interface NextConnectApiRequest extends NextApiRequest {
    file: Express.Multer.File;
}