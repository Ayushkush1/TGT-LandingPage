import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { CMSDataInitializer } from "@/components/CMSDataInitializer";
import FooterScripts from "@/components/FooterScripts";
import { RenderSchema } from "@/components/RenderSchema";
import { cache } from "react";
import QueryProvider from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Global object caching for SEO to survive hot-reloads in Next.js dev mode
const globalForSEO = global as unknown as {
  serverCachedGlobalSEO: any;
  serverCachedGlobalSEOExpiry: number;
};

if (globalForSEO.serverCachedGlobalSEO === undefined) {
  globalForSEO.serverCachedGlobalSEO = null;
  globalForSEO.serverCachedGlobalSEOExpiry = 0;
}

const getGlobalSEO = cache(async () => {
  const now = Date.now();
  if (
    globalForSEO.serverCachedGlobalSEO &&
    now < globalForSEO.serverCachedGlobalSEOExpiry
  ) {
    return globalForSEO.serverCachedGlobalSEO;
  }

  try {
    const response = await fetch("https://tgt-cms.vercel.app/api/seo/global", {
      cache: "no-store", // Bypasses Next.js cache limit
    });
    const json = await response.json();
    const data = json?.data || null;
    globalForSEO.serverCachedGlobalSEO = data;
    globalForSEO.serverCachedGlobalSEOExpiry = now + 5 * 60 * 1000; // Cache for 5 minutes
    return data;
  } catch (error) {
    console.error("Error fetching global SEO for metadata:", error);
    return globalForSEO.serverCachedGlobalSEO;
  }
});

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
  const globalSEO = await getGlobalSEO();

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
            strategy="afterInteractive"
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
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
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
        {globalSEO?.schema && (
          <RenderSchema schema={globalSEO.schema} id="global-schema" />
        )}
      </head>
      <body className={inter.className}>
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
        <QueryProvider>
          <CMSDataInitializer>{children}</CMSDataInitializer>
        </QueryProvider>
        {/* Custom Footer Scripts */}
        {globalSEO?.customFooterScripts && (
          <FooterScripts html={globalSEO.customFooterScripts} />
        )}
      </body>
    </html>
  );
}
