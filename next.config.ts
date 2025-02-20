// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

module.exports = {
  experimental: {
    appDir: true, // Ensure App Router is enabled
  },
  output: "standalone",
  generateBuildId: async () => {
    return "my-build"; // Prevents Next.js from assuming static generation
  },
};