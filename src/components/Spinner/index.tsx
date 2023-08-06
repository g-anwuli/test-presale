import React from "react";

interface SpinnerProps {
  size?: string;
  border?:string;
  color?: `border-${string} border-l-${string}/50`;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "24px",
  color = "border-[#F26395] border-l-[#F26395]/50",
  border="border-[3px]"
}) => {
  return (
    <div
      className={`animate-spin rounded-full ${border} ${color} `}
      style={{ width: size, height: size }}
    ></div>
  );
};

export default Spinner;
