const { hostname } = require("os");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: { domains: ["drive.google.com"] },
};
