// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/app",
  output: "export", // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;
