import FallingText from "./FallingTextProps";
import Squares from "./Squares";

function NotFound() {
  return (
    <>
      <Squares
        speed={0.1}
        squareSize={40}
        direction="diagonal"
        borderColor="#fff"
        hoverFillColor="#a95d5dff"
      />

      <FallingText
        text={`PAGE 404`}
        highlightWords={["React", "Bits", "animated", "components", "simplify"]}
        highlightClass="highlighted"
        trigger="click"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.9}
      />
    </>
  );
}

export default NotFound;
