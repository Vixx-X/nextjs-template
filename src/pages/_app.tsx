import { AuthContextProvider } from "@contexts/AuthContext";
import { UserContextProvider } from "@contexts/UserContext";
import "@styles/globals.css";
import { localStorageProvider } from "@utils/localStorageProvider";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        provider: localStorageProvider,
      }}
    >
      <AuthContextProvider>
        <UserContextProvider>
          <AnimatePresence>
            <Component {...pageProps} />
          </AnimatePresence>
        </UserContextProvider>
      </AuthContextProvider>
    </SWRConfig>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// TODO: maybe just for this reason, we may be changing it for specific pages,
// or removing it altogether
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // use this if we want auth from server
//   const tokens = await getAuth(appContext.ctx);
//   appContext.ctx = { ...appContext.ctx, ...tokens };

//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return appProps;
// };

export default MyApp;
