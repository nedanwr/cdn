import type { NextPage } from "next";
import { WaitForAuth } from "@modules/auth/WaitForAuth";
import { getAuth, signOut } from "firebase/auth";

const Home: NextPage = () => {
    const logOut = async () => {
        const auth = getAuth();

        await signOut(auth);
    }

    return (
        <WaitForAuth>
            <h1>Hello World</h1>
            <button onClick={logOut}>Logout</button>
        </WaitForAuth>
    )
}

export default Home;
