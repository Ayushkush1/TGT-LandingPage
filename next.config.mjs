/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jrltxuhcmvqxuwukacju.supabase.co",
        pathname: "/storage/v1/object/public/uploadsFiles/**",
      },
    ],
  },
};

export default nextConfig;
