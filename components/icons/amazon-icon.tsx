// components/AmazonIcon.tsx
import React from "react";

interface AmazonIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const AmazonIcon: React.FC<AmazonIconProps> = ({
  width = "40",
  height = "40",
  className = "",
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    enableBackground="new 0 0 40 40"
    version="1.1"
    viewBox="0 0 40 40"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <path
        d="M26.5,20.3c0-1.5,0-6.8,0-8.2c0-1.4-1.4-4.6-6.2-4.6c-4.9,0-7.4,3.1-7.4,5.8l4.1,0.4c0,0,0.9-2.8,3-2.8 c2.1,0,2.5,1.7,2.5,2.1c0,0.1,0,0.8,0,1.8C19.7,14.9,12,15.7,12,21.3c0,6.1,8.1,6.4,10.6,2.4c0.1,0.2,0.2,0.3,0.3,0.5 c0.9,1,2.2,2.1,2.2,2.1l3.1-3.1C28.2,23.2,26.5,21.8,26.5,20.3z M22.4,19.6c0,4.5-5.2,3.8-5.2,1c0-2.6,3.3-3.2,5.2-3.2 C22.4,18.2,22.4,18.9,22.4,19.6z"
        fill="#34495E"
      />
      <path
        d="M8.5,26.4c4.1,2.5,10.4,6.6,20.6,1.7c0.4-0.2,0.7,0.1,0.3,0.7c-0.4,0.6-3.9,3.7-9.6,3.7 c-5.8,0-10.2-4-11.6-5.6C7.8,26.4,8.2,26.2,8.5,26.4z"
        fill="#F39C12"
      />
      <path
        d="M31.9,26.5c-0.3-0.4-1.7-0.4-2.5-0.3c-0.9,0.1-2.2,0.6-2.1,1c0.1,0.1,0.2,0.1,0.8,0 c0.6-0.1,2.3-0.3,2.6,0.2c0.4,0.5-0.5,2.7-0.7,3.1c-0.2,0.4,0.1,0.5,0.4,0.2c0.3-0.2,0.8-0.9,1.2-1.7C31.9,28,32.1,26.8,31.9,26.5 z"
        fill="#F39C12"
      />
    </g>
  </svg>
);

export default AmazonIcon;
