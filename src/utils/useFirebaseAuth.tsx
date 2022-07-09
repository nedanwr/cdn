import { useState, useEffect } from "react";
import "./initFirebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const formatAuthUser = (user: any) => ({
    uid: user.uid,
    email: user.email,
});

export const useFirebaseAuth = () => {
    // State
    const [authUser, setAuthUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Auth
    const auth = getAuth();

    const authStateChanged = async (authState: any) => {
        if (!authState) {
            setAuthUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        const formattedUser = formatAuthUser(authState);
        setAuthUser(formattedUser);
        setLoading(false);
    };

    // Listen for Firebase auth state changes
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, authStateChanged);
       return () => unsubscribe();
    }, [auth]);

    return {
        authUser,
        loading,
    };
}