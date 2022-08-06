import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import "aos/dist/aos.css";
import AOS, { AosOptions } from "aos";
import Script from "next/script";

const AOS_SETTINGS: AosOptions = {
  easing: "ease",
  once: false,
  duration: 400,
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init(AOS_SETTINGS);
  }, []);
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="123">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
export default MyApp;
