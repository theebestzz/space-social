import withNextIntl from "next-intl/plugin";

const withNextIntlConfig = withNextIntl("./src/i18n/index.ts");

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntlConfig(nextConfig);
