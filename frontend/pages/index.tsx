import type { NextPage } from "next";
import Head from "next/head";
import SplashBanner from "@components/landing/Splash";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>🔥 Burn My Wallet | Mark your hacked wallets</title>
        <meta name="description" content="Mark your hacked wallets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SplashBanner />
    </div>
  );
};

export default Home;
