/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty','lokijs','encoding');
    config.resolve.fallback = { fs: false, net: false, tls: false }; //For connectkit
    return config;
  },
};

export default nextConfig;
