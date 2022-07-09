import React from "react";
import { getAuth, Auth, onAuthStateChanged, User } from "firebase/auth";

export const WaitForAuth = ({ children }: any) => {
    const auth: Auth = getAuth();
    onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
            return <>{children}</>;
        }
        else {
            if (window !== undefined) {
                window.location.href = "/auth/login";
            }
        }
    });
}