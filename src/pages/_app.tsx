import type { AppProps } from "next/app";
import { AuthUserProvider } from "@context/authUserContext";
import "../styles/globals.scss";
import "@utils/initFirebase";

const App = ({ Component, pageProps }: AppProps) => {
  return <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>;
}

export default App;
