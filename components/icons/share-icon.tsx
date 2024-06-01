import React from "react";

interface ShareIconProps {
  width?: string;
  height?: string;
  fill?: string;
  className?: string;
}

const ShareIcon: React.FC<ShareIconProps> = ({
  width = "18",
  height = "18",
  fill = "black",
  className = "",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g id="majesticons:share">
      <path
        id="Vector"
        d="M15 9L10.2 3.75V6.375C7.8 6.375 3 7.95 3 14.25C3 13.3748 4.44 11.625 10.2 11.625V14.25L15 9Z"
        fill={fill}
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default ShareIcon;
