/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized:true,
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
  