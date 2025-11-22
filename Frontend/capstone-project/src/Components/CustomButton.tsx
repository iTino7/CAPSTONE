import { Button } from "react-bootstrap";
import type { MouseEvent } from "react";

interface ButtonCustom {
  classCustom: string;
  styleCustom: React.CSSProperties;
  text?: string;
  navigate?: () => void;
}

function CustomButton({
  classCustom,
  styleCustom,
  text,
  navigate,
}: ButtonCustom) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigate) {
      navigate();
    }
  };

  // Cast Button to any to avoid TS2590 error with complex union types
  const ButtonComponent = Button as any;

  return (
    <ButtonComponent
      type="button"
      onClick={handleClick}
      className={classCustom}
      style={styleCustom}
    >
      <span className="span-mother">
        {text?.split("-").map((letter, i) => (
          <span key={i}> {letter} </span>
        ))}
      </span>
      <span className="span-mother2">
        {text?.split("-").map((letter, i) => (
          <span key={i}> {letter} </span>
        ))}
      </span>
    </ButtonComponent>
  );
}

export default CustomButton;
