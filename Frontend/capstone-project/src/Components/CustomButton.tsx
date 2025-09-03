import { Link } from "react-router-dom";

interface ButtonCustom {
  classCustom: string;
  styleCustom: object;
  text: string;
  linkCustom: string;
}

function CustomButton({
  classCustom,
  styleCustom,
  text,
  linkCustom,
}: ButtonCustom) {
  return (
    <Link to={`auth/${linkCustom}`} className={classCustom} style={styleCustom}>
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
    </Link>
  );
}

export default CustomButton;
