import { useState, useEffect } from "react";
import "./initFirebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";

const formatAuthUser = (user: any) => ({
    uid: user.uid,
    email: user.email,
});

export const useFirebaseAuth = () => {
    // State
    const [authUser, setAuthUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Set Auth
    const auth = getAuth();

    const authStateChanged = async (authState: any) => {
        if (!authState) {
            setLoading(false);
            return;
        }

        setLoading(true);

        let formattedUser = formatAuthUser(authState);

        setAuthUser(formattedUser);

        setLoading(false);
    };

    const clear = (): void => {
        setAuthUser(null);
        setLoading(true);
    };

    const signInWithEmailAndPassword = async (email: string, password: string) => {
        await signInWithEmailAndPassword(email, password);
    }

    const createUserWithEmailAndPassword = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(email, password);
    }

    const signOut = async () => {
        await signOut().then(clear);
    }
}