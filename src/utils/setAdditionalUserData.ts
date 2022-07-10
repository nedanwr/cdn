import { getFirestore, doc, setDoc } from "firebase/firestore";
import { generateUploadKey } from "../lib/generateUploadKey";

export const setAdditionalUserData = async (uid: string, displayName: string) => {
    const firestore = getFirestore();

    await setDoc(doc(firestore, "users", uid), {
        displayName,
        uploadKey: generateUploadKey(),
        createdAt: new Date().getTime(),
    });
};