// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/columnrearranger/out",
  output: "export", // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;
