import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { useEffect } from 'react';

const Document = () => {
  // @ts-ignore
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('SW registered: ', registration);
          },
          (registrationError) => {
            console.log('SW registration failed: ', registrationError);
          }
        );
      });
    }
  }, []);

  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" type="image/ico" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/ico" sizes="16x16" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <Script
          type="text/javascript"
          strategy="afterInteractive"
          src={
            `https://https://www.googletagmanager.com/gtag/js?id=` +
            process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
          }
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
            `}
        </Script>
      </Head>

      {/* you can apply global style to entire document from here like*/}
      <body className="">
        <div className="">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
};

export default Document;
