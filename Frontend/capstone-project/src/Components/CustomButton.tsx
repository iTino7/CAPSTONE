import { Button } from "react-bootstrap";

interface ButtonCustom {
  classCustom: string;
  styleCustom: object;
  text: string;
}

function CustomButton({ classCustom, styleCustom, text }: ButtonCustom) {
  return (
    <Button className={classCustom} style={styleCustom}>
      <span className="span-mother">
        {text.split("-").map((letter, i) => (
          <span key={i}> {letter} </span>
        ))}
      </span>
      <span className="span-mother2">
        {text?.split("-").map((letter, i) => (
          <span key={i}> {letter} </span>
        ))}
      </span>
    </Button>
  );
}

export default CustomButton;
