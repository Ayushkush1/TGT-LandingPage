/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The CEO page was folded into the founder's note on /about.
    return [
      { source: "/ceo", destination: "/about#founder", permanent: true },
      // Digital Marketing was split into two Grow pages; IoT and Accessibility were retired.
      { source: "/service/digital-marketing", destination: "/service/search-content-marketing", permanent: true },
      { source: "/service/iot-solutions", destination: "/#services", permanent: true },
      { source: "/service/accessibility-services", destination: "/#services", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      // Every image (CMS uploads and the site's own) is served from Cloudinary, folder "tgt"
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dpa93copz/**",
      },
      // Direct image URLs pasted into the CMS
      {
        protocol: "https",
        hostname: "thegoldtechnologies.com",
      },
    ],
  },
};

export default nextConfig;
