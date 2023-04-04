/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DEV_ENV: process.env.DEV_ENV,
    }
}

module.exports = nextConfig