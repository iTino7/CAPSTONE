import { Spinner } from "react-bootstrap";

interface LoadingSpinnerProps {
  size?: "sm" | undefined;
  className?: string;
  text?: string;
}

function LoadingSpinner({ size, className = "", text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className={`d-flex flex-column align-items-center justify-content-center ${className}`}>
      <Spinner animation="border" variant="primary" size={size} />
      <span className="text-white mt-2">{text}</span>
    </div>
  );
}

export default LoadingSpinner;
