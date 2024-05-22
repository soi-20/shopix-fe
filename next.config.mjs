/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          port: "",
          pathname: "/supertramp69420/**",
        },
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  };
  
  export default nextConfig;
  