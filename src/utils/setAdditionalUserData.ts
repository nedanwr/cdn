import { getFirestore, doc, setDoc } from "firebase/firestore";

export const setAdditionalUserData = async (uid: string, displayName: string) => {
    const firestore = getFirestore();

    await setDoc(doc(firestore, "users", uid), {
        displayName,
        createdAt: new Date().getTime(),
    });
};