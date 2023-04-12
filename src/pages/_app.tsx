import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";
import { Merriweather, Open_Sans, Roboto_Slab } from "next/font/google";

const openSans = Open_Sans({
  style: "normal",
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-open-sans",
});
const merriweather = Merriweather({
  style: ["italic", "normal"],
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-merriweather",
});
const robotoSlab = Roboto_Slab({
  style: "normal",
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto-slab",
});

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Simple Weather app" />
    </Head>
    <div
      className={`${openSans.variable} ${merriweather.variable} ${robotoSlab.variable} font-sans`}
    >
      <Component {...pageProps} />
    </div>
  </>
);

export default App;
