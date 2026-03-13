"use client";

import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { WhoWeAre } from "./sections/WhoWeAre";
import { WhatWeDo } from "./sections/WhatWeDo";
import { Integrations } from "./sections/Integrations";
import { BlogSection } from "./sections/BlogSection";
import { OurReputation } from "./sections/OurReputation";
import { OurPartners } from "./sections/OurPartners";
import { EnquirySection } from "./sections/EnquirySection";
// Import About components
import AboutFirm from "@/app/about/components/AboutFirm";
import VideoSection from "@/app/about/components/VideoSection";
import VisionSection from "@/app/about/components/VisionSection";
import OurTeam from "@/app/about/components/OurTeam";

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
