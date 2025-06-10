import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="flex flex-col items-center min-h-screen bg-dark-bg">
    <Head>
      <title>NeuroNLP - Brain Cognition Scoring</title>
      <meta name="description" content="Analyze cognitive patterns from natural language." />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header className="w-full border-b border-dark-border">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            NeuroNLP
          </a>
        </Link>
      </nav>
    </header>

    <main className="w-full flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
      {children}
    </main>

    <footer className="w-full text-center p-4 border-t border-dark-border text-subtle-text">
      <span>Project by BSDSF22A028 & BSDSF22A029</span>
    </footer>
  </div>
);

export default Layout;