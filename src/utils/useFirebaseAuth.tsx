import { useState, useEffect } from "react";
import "./initFirebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";
import type { Auth } from "firebase/auth";

const formatAuthUser = (user: any) => ({
    uid: user.uid,
    email: user.email,
});

export const useFirebaseAuth = () => {
    // State
    const [authUser, setAuthUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Set Auth
    const auth: Auth = getAuth();

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

    const logIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    }

    const createUser = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    const logOut = async () => {
        await signOut(auth).then(clear);
    }
}