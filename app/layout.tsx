import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/Layout';
import 'react-circular-progressbar/dist/styles.css';

export const metadata: Metadata = {
  title: 'Nexarb',
  description: 'NexGen Price Feed',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
