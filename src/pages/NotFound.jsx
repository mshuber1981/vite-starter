import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Not Found...</h1>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
