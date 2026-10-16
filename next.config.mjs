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
      {
        protocol: "https",
        hostname: "jrltxuhcmvqxuwukacju.supabase.co",
        pathname: "/storage/v1/object/public/uploadsFiles/**",
      },
      {
        protocol: "https",
        hostname: "thegoldtechnologies.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
