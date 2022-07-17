import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import "aos/dist/aos.css";
import AOS, { AosOptions } from "aos";

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
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
export default MyApp;
