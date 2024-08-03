/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'den-my-burguers.s3.amazonaws.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };

export default nextConfig;