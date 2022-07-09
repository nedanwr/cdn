import { createContext, useContext } from "react";
import { useFirebaseAuth } from "../utils/useFirebaseAuth";

const authUserContext = createContext({
    authUser: null,
    loading: true,
});

export const AuthUserProvider = ({ children }: any) => {
    const auth = useFirebaseAuth();
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);