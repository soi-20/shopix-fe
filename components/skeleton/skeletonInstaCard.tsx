import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonInstaCard = (props: any) => (
  <ContentLoader
    speed={1}
    width={300}
    height={500}
    viewBox="0 0 300 500"
    backgroundColor="#fafafa"
    foregroundColor="#eaeaea"
    {...props}
  >
    {/* Image placeholder */}
    <rect x="10" y="10" rx="10" ry="10" width="280" height="250" />
    {/* Title placeholder */}
    <rect x="10" y="280" rx="5" ry="5" width="280" height="20" />
    {/* Source placeholder */}
    <rect x="10" y="310" rx="5" ry="5" width="180" height="20" />
    {/* Price placeholder */}
    <rect x="10" y="340" rx="5" ry="5" width="100" height="20" />
    {/* Button placeholder */}
    <rect x="10" y="370" rx="5" ry="5" width="280" height="40" />
  </ContentLoader>
);

export default SkeletonInstaCard;
