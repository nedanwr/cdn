import { app } from "./initFirebase";
import { FirebaseStorage, StorageReference } from "firebase/storage";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export const uploadImage = async (fileName: string, file: Express.Multer.File) => {
    const storage: FirebaseStorage = getStorage(app, process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_URL!);
    const storageRef: StorageReference = ref(storage, `${fileName}.${file.mimetype.split("/")[1]}`);

    return uploadBytesResumable(storageRef, file.buffer, {
        cacheControl: "public",
        contentType: file.mimetype
    }).snapshot.ref;
}