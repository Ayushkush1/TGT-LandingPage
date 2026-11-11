"use client";

import { useCallback } from "react";
import { useCMSStore } from "@/store/useCMSStore";

/**
 * Technology logos (Simple Icons, in brand colours), matched by the names used in service stacks
 * and CMS tags. From the CMS (Static pages → Services → Tech Stack, shared by all services);
 * the lists below are only the fallback while the CMS has none.
 */
const aliases: Record<string, string> = {
  // Service stacks
  "react js": "react",
  "next.js": "nextdotjs",
  "vue js": "vuedotjs",
  "node & express": "nodedotjs",
  "nest js": "nestjs",
  laravel: "laravel",
  django: "django",
  wordpress: "wordpress",
  shopify: "shopify",
  flutter: "flutter",
  "react native": "react",
  "ios (swift)": "swift",
  "android (java, kotlin)": "android",
  "mern stack": "mongodb",
  "mean stack": "angular",
  ".net": "dotnet",
  java: "openjdk",
  python: "python",
  flask: "flask",
  "blockchain & web3": "ethereum",
  sap: "sap",
  analytics: "googleanalytics",
  "analytics & cro": "googleanalytics",
  "google ads": "googleads",
  "meta ads": "meta",
  "generative ai": "openai",
  tableau: "tableau",
  aws: "amazonwebservices",
  figma: "figma",
  // CMS tags
  react: "react",
  "node.js": "nodedotjs",
  vue: "vuedotjs",
  woocommerce: "woocommerce",
  "shopify plus": "shopify",
  swift: "swift",
  kotlin: "kotlin",
  docker: "docker",
  kubernetes: "kubernetes",
  postgresql: "postgresql",
  stripe: "stripe",
  "tailwind css": "tailwindcss",
  graphql: "graphql",
  sanity: "sanity",
  linkedin: "linkedin",
  instagram: "instagram",
  "openai api": "openai",
  xcode: "xcode",
  "android studio": "androidstudio",
  "google play": "googleplay",
  "play store": "googleplay",
  "app store connect": "appstore",
  "apple ui": "apple",
  "material design": "materialdesign",
  "aws / cloud": "amazonwebservices",
};

const defaultLogoUrls: Record<string, string> = {
  "amazonwebservices": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375962/tgt/amazonwebservices-1794375961644.svg",
  "android": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375962/tgt/android-1794375961673.svg",
  "androidstudio": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375962/tgt/androidstudio-1794375962172.svg",
  "angular": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375962/tgt/angular-1794375962234.svg",
  "apple": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375964/tgt/apple-1794375964296.svg",
  "appstore": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375964/tgt/appstore-1794375964301.svg",
  "django": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375964/tgt/django-1794375964303.svg",
  "docker": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375964/tgt/docker-1794375964425.svg",
  "dotnet": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375966/tgt/dotnet-1794375965906.svg",
  "ethereum": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375966/tgt/ethereum-1794375966255.svg",
  "figma": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375966/tgt/figma-1794375966390.svg",
  "flask": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375967/tgt/flask-1794375967056.svg",
  "flutter": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375968/tgt/flutter-1794375967966.svg",
  "googleads": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375968/tgt/googleads-1794375967985.svg",
  "googleanalytics": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375968/tgt/googleanalytics-1794375968028.svg",
  "googleplay": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375969/tgt/googleplay-1794375969582.svg",
  "graphql": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375969/tgt/graphql-1794375969632.svg",
  "instagram": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375970/tgt/instagram-1794375969766.svg",
  "kotlin": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375970/tgt/kotlin-1794375969833.svg",
  "kubernetes": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375971/tgt/kubernetes-1794375971100.svg",
  "laravel": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375971/tgt/laravel-1794375971110.svg",
  "linkedin": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375972/tgt/linkedin-1794375971787.svg",
  "materialdesign": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375972/tgt/materialdesign-1794375971790.svg",
  "meta": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375973/tgt/meta-1794375973408.svg",
  "mongodb": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375973/tgt/mongodb-1794375973486.svg",
  "nestjs": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375973/tgt/nestjs-1794375973496.svg",
  "nextdotjs": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375973/tgt/nextdotjs-1794375973503.svg",
  "nodedotjs": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375975/tgt/nodedotjs-1794375975060.svg",
  "openai": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375975/tgt/openai-1794375975115.svg",
  "openjdk": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375975/tgt/openjdk-1794375975473.svg",
  "postgresql": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375976/tgt/postgresql-1794375975974.svg",
  "python": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375977/tgt/python-1794375976830.svg",
  "react": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375977/tgt/react-1794375976833.svg",
  "sanity": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375977/tgt/sanity-1794375977539.svg",
  "sap": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375979/tgt/sap-1794375978648.svg",
  "shopify": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375979/tgt/shopify-1794375979156.svg",
  "stripe": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375979/tgt/stripe-1794375979254.svg",
  "swift": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375979/tgt/swift-1794375979392.svg",
  "tableau": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375980/tgt/tableau-1794375980283.svg",
  "tailwindcss": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375981/tgt/tailwindcss-1794375981169.svg",
  "vuedotjs": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375982/tgt/vuedotjs-1794375981832.svg",
  "woocommerce": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375982/tgt/woocommerce-1794375982577.svg",
  "wordpress": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375982/tgt/wordpress-1794375982611.svg",
  "xcode": "https://res.cloudinary.com/dpa93copz/image/upload/v1794375983/tgt/xcode-1794375982887.svg",
};

/** Looks up a technology's logo URL by name (not case-sensitive): the CMS list, else the defaults. */
export function useTechLogo(): (name: string) => string | undefined {
  const cms = useCMSStore((s) => s.site?.siteImages?.techLogos);
  return useCallback(
    (name: string) => {
      const key = name.trim().toLowerCase();
      if (Array.isArray(cms) && cms.length > 0) {
        return cms.find((t) => t.name === key || t.matches?.includes(key))?.image || undefined;
      }
      const slug = aliases[key];
      return slug ? defaultLogoUrls[slug] : undefined;
    },
    [cms],
  );
}
