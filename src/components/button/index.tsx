import React from "react";
import Spinner from "../Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  h?: string;
  w?: string;
  loading?: boolean;
  loaderSize?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  w = "w-[163px]",
  h = "h-[56px]",
  loaderSize,
  loading,
  disabled,
  ...props
}) => {
  const buttonClasses = ` ${className} ${w} ${h} bg-primary text-white rounded-[30px] transition font-medium active:scale-[0.995] disabled:active:scale-100 relative outline-none disabled:opacity-75 leading-none`;

  return (
    <button disabled={loading || disabled} className={buttonClasses} {...props}>
      {children}
      {loading && (
        <div className="inset-0 absolute flex items-center justify-center">
          <Spinner color="border-white border-l-white/50" size={loaderSize} />
        </div>
      )}
    </button>
  );
};

export default Button;
