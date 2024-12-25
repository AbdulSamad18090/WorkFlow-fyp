const nextConfig = {
  experimental: {
    appDir: true, // Example: Enable the app directory feature
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com", // Add Firebase Storage domain here
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com", // Add Facebook platform domain here
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
