"use client";

import React from "react";
import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("./sections/HeroSection").then((m) => m.HeroSection));
const WhoWeAre = dynamic(() => import("./sections/WhoWeAre").then((m) => m.WhoWeAre));
const WhatWeDo = dynamic(() => import("./sections/WhatWeDo").then((m) => m.WhatWeDo));
const Integrations = dynamic(() => import("./sections/Integrations").then((m) => m.Integrations));
const BlogSection = dynamic(() => import("./sections/BlogSection").then((m) => m.BlogSection));
const OurReputation = dynamic(() => import("./sections/OurReputation").then((m) => m.OurReputation));
const OurPartners = dynamic(() => import("./sections/OurPartners").then((m) => m.OurPartners));
const EnquirySection = dynamic(() => import("./sections/EnquirySection").then((m) => m.EnquirySection));

// Import About components dynamically
const AboutFirm = dynamic(() => import("@/app/about/components/AboutFirm"));
const VideoSection = dynamic(() => import("@/app/about/components/VideoSection"));
const VisionSection = dynamic(() => import("@/app/about/components/VisionSection"));
const OurTeam = dynamic(() => import("@/app/about/components/OurTeam"));

const componentMap: { [key: string]: React.ComponentType<any> } = {
  HeroSection,
  WhoWeAre,
  WhatWeDo,
  Integrations,
  BlogSection,
  OurReputation,
  OurPartners,
  EnquirySection,
  AboutFirmSection: AboutFirm,
  AboutFirm, // Handle both names
  VideoSection,
  VisionSection,
  OurTeam,
};

export const DynamicSectionRenderer = ({ sections }: { sections: any[] }) => {
  if (!sections || !Array.isArray(sections)) return null;

  return (
    <>
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section: any) => {
          const Component = componentMap[section.type];
          if (!Component) {
            console.warn(
              `Component for section type "${section.type}" not found.`,
            );
            return null;
          }
          return <Component key={section.id} data={section.content} />;
        })}
    </>
  );
};
