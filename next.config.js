const { hostname } = require("os");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: { domains: ["drive.google.com"] },

  exportPathMap: function () {
    // /Next-React-Components
    return {
      "/": { page: "/" },
      "/bidbad/bidding": { page: "/bidbad/bidding" },
    };
  },
};
