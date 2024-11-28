import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: { silenceDeprecations: ["legacy-js-api"] },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/flow?page=1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
