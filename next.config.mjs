/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**",
        pathname: "**",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
