import { firestore } from "./initFirebase";
import { doc, getDoc } from "firebase/firestore";
import type { DocumentReference, DocumentSnapshot } from "firebase/firestore";

export const getUser = async (uid: string) => {
    // Create doc reference
    const docRef: DocumentReference = doc(firestore, "users", uid);
    // Get doc using doc reference
    const docSnap: DocumentSnapshot = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }
    else {
        // User does not exist
        return null;
    }
}