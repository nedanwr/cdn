import type { NextPage } from "next";
import { useState, FormEvent, ChangeEvent } from "react";
import Head from "next/head";
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

// Import Utils
import { setAdditionalUserData } from "@utils/setAdditionalUserData";

export const RegisterPage: NextPage = () => {
    // State
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Register User
    const registerUser = async (email: string, password: string, displayName: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (response: UserCredential) => {
                await setAdditionalUserData(response.user.uid, displayName);
            })
            .catch((error: Error) => {
               throw error;
            })
            .finally(() => {
                // Reset State
                setDisplayName("");
                setEmail("");
                setPassword("");
                // Redirect to Login Page
                if (window !== undefined) {
                    window.location.href = "/auth/login";
                }
            });
    }

    return (
        <>
           <Head>
               <title>Register — CDN</title>
           </Head>
           <div
               className={`flex bg-gray-800 text-gray-100 h-screen w-screen m-auto justify-center align-middle self-center items-center`}
           >
               <form
                   autoComplete={`off`}
                   spellCheck={`false`}
                   onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                       e.preventDefault();
                       await registerUser(email, password, displayName);
                   }}
               >
                   <h1 className={`font-bold text-2xl mb-6 text-gray-100`}>Create an account</h1>
                   <div className="flex flex-col mb-6">
                       <label
                           htmlFor={`displayName`}
                           className={`font-medium text-sm mb-1.5`}
                       >
                           Name
                       </label>
                       <input
                           type={`text`}
                           name={`displayName`}
                           id={`displayName`}
                           aria-label={`Albus`}
                           className={`text-left text-black outline-none border-2 rounded px-4 py-2.5`}
                           placeholder={`Albus`}
                           spellCheck={`false`}
                           autoCapitalize={`none`}
                           autoComplete={`off`}
                           autoCorrect={`off`}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
                           required
                       />
                       {/* eslint-disable-next-line react/no-unescaped-entities */}
                       <p className={`text-xs mt-1 text-gray-400`}>You don't have to use your real full name. Just whichever name you prefer.</p>
                   </div>
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
                       <label
                           htmlFor={`password`}
                           className={`font-medium text-sm mb-1.5`}
                       >
                           Password
                       </label>
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
                           minLength={8}
                           maxLength={64}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                           required
                       />
                   </div>
                   <button
                       type={`submit`}
                       className={`bg-amber-500 text-white py-3.5 px-44 rounded-3xl w-full mt-6 font-medium`}
                   >
                       Register
                   </button>
               </form>
           </div>
        </>
    )
}