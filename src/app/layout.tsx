import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { CMSDataInitializer } from "@/components/CMSDataInitializer";
import FooterScripts from "@/components/FooterScripts";
import { getGlobalSEOData, getInitialCMSState } from "@/lib/cmsServer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
});

// Cached for 60s (see cmsServer.ts) so title, description & favicon stay fresh
// without a CMS round-trip on every request.
const getGlobalSEO = getGlobalSEOData;

export async function generateMetadata(): Promise<Metadata> {
  const globalSEO = await getGlobalSEO();

  return {
    title: globalSEO?.siteTitle,
    description: globalSEO?.siteDescription,
    icons: {
      icon: globalSEO?.favicon,
    },
    other: {
      "google-site-verification": globalSEO?.searchConsoleId,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [globalSEO, initialCMSState] = await Promise.all([
    getGlobalSEO(),
    getInitialCMSState(),
  ]);

  return (
    <html lang="en">
      <head>
        {/* Dynamic Favicon — set directly to avoid browser caching old icon */}
        {globalSEO?.favicon && (
          <link
            rel="icon"
            href={`${globalSEO.favicon}?v=${Math.floor(Date.now() / 3600000)}`}
            type={
              globalSEO.favicon.match(/\.(jpg|jpeg)$/i)
                ? "image/jpeg"
                : globalSEO.favicon.match(/\.png$/i)
                ? "image/png"
                : "image/x-icon"
            }
          />
        )}
        {/* Google Tag Manager */}
        {globalSEO?.gtmId && (
          <Script
            id="gtm-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${globalSEO.gtmId}');
              `,
            }}
          />
        )}
        {/* Google Analytics */}
        {globalSEO?.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${globalSEO.googleAnalyticsId}`}
              strategy="lazyOnload"
            />
            <Script
              id="google-analytics"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${globalSEO.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}
        {/* Custom Header Scripts */}
        {globalSEO?.customHeaderScripts && (
          <script
            dangerouslySetInnerHTML={{ __html: globalSEO.customHeaderScripts }}
          />
        )}
      </head>
      <body className={`${inter.className} ${playfair.variable}`}>
        {/* GTM Noscript */}
        {globalSEO?.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${globalSEO.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <CMSDataInitializer initialState={initialCMSState}>
          {children}
        </CMSDataInitializer>
        {/* Custom Footer Scripts */}
        {globalSEO?.customFooterScripts && (
          <FooterScripts html={globalSEO.customFooterScripts} />
        )}
      </body>
    </html>
  );
}
