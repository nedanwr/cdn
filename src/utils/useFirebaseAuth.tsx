import { useState, useEffect } from "react";
import "./initFirebase";

const formatAuthUser = (user: any) => ({
    uid: user.uid,
    email: user.email,
});

export const useFirebaseAuth = () => {
    // State
    const [authUser, setAuthUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
}