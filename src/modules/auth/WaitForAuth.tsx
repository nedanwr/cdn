import { useRouter } from "next/router";
import { useAuth } from "../../context/authUserContext";

export const WaitForAuth = ({ children }: any) => {
    const { authUser, loading } = useAuth();
    const router = useRouter();

    // If is not authenticated, redirect to log in page
    if (!loading && !authUser) {
        router.push("/auth/login");
        return <h1>Redirecting...</h1>;
    }

    return <>{children}</>;
}