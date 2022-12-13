import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the home page</h1>

      <p>
        <Link to="/mediafiles">Media Files</Link>
      </p>
      <p>
        <Link to="/categories">Categories</Link>
      </p>
    </div>
  );
};

export default Home;
