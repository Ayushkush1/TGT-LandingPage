/** @type {import('next').NextConfig} */
const nextConfig = {
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
