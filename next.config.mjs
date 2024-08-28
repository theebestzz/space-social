import withNextIntl from "next-intl/plugin";

const withNextIntlConfig = withNextIntl("./src/i18n/index.ts");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntlConfig(nextConfig);
