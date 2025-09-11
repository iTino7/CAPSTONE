import { Link } from "react-router-dom";
import BackgroundSubscription from "../BackgroundSubscription";

function Subscription() {
  return (
    <>
      <Link to="/" className="text-decoration-none w-100">
        <h1 className="m-3 text-dark">MovieVerse</h1>
      </Link>

      <BackgroundSubscription textColorCustom="text-dark" />
    </>
  );
}

export default Subscription;
