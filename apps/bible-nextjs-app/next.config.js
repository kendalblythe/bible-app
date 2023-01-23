/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es", "he"],
    defaultLocale: "en",
  },
  daisyui: {
    rtl: true,
  },
};

export default nextConfig;
