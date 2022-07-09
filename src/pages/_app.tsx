import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "../utils/initFirebase";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
}

export default App;
