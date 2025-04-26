import { Link } from "react-router-dom";

const ExampleRoute = () => {
  return (
    <div>
      <h1>Test</h1>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default ExampleRoute;
