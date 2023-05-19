/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports =  {
  nextConfig,
  pages: ["pages/index.js", "pages/api/sendEmail.js"],
};
