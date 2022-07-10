import type { NextPage } from "next";
import { useState, FormEvent, ChangeEvent } from "react";
import Head from "next/head";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const LoginPage: NextPage = () => {
    // State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Login User
    const loginUser = async (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .catch((error: Error) => {
                console.error(error.message);
            })
            .finally(() => {
                // Reset State
                setEmail("");
                setPassword("");
                // Redirect to Home Page
                if (window !== undefined) {
                    window.location.href = "/";
                }
            });
    }

    return (
        <>
            <Head>
                <title>Login — CDN</title>
            </Head>
            <div
                className={`flex bg-gray-800 text-gray-100 h-screen w-screen m-auto justify-center align-middle self-center items-center`}
            >
                <form
                    autoComplete={`off`}
                    spellCheck={`false`}
                    onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        await loginUser(email, password);
                    }}
                >
                    <h1 className={`font-bold text-2xl mb-6 text-gray-100`}>Log in to your account</h1>
                    <div className="flex flex-col mb-6">
                        <label
                            htmlFor={`email`}
                            className={`font-medium text-sm mb-1.5`}
                        >
                            Email
                        </label>
                        <input
                            type={`email`}
                            name={`email`}
                            id={`email`}
                            aria-label={`albus@hogwarts.edu`}
                            className={`text-left text-black outline-none border-2 rounded px-4 py-2.5`}
                            placeholder={`albus@hogwarts.edu`}
                            spellCheck={`false`}
                            autoCapitalize={`none`}
                            autoComplete={`off`}
                            autoCorrect={`off`}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-6">
                        <div className="flex flex-row justify-between">
                            <label
                                htmlFor={`password`}
                                className={`font-medium text-sm mb-1.5`}
                            >
                                Password
                            </label>
                            <a
                                href={`/auth/reset`}
                                id="forgot-password"
                                className={`font-medium text-sm text-amber-500`}
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <input
                            type={`password`}
                            name={`password`}
                            id={`password`}
                            aria-label={`********`}
                            className={`text-left text-black outline-none border-2 rounded px-4 py-2.5`}
                            placeholder={`********`}
                            spellCheck={`false`}
                            autoCapitalize={`none`}
                            autoComplete={`off`}
                            autoCorrect={`off`}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type={`submit`}
                        className={`bg-amber-500 text-white py-3.5 px-44 rounded-3xl w-full mt-6 font-medium`}
                    >
                        Continue
                    </button>
                </form>
            </div>
        </>
    );
}