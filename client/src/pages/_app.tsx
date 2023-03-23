import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/styles/globals.css";
import { AccessTokenProvider } from "@/lib/auth/access-token";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AccessTokenProvider>
        <Component {...pageProps} />
      </AccessTokenProvider>
    </UserProvider>
  );
}
