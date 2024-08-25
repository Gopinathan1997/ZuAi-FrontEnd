import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const retrieveBlogs = async () => {
      try {
      const url =
        "https://zuai-backend-sfp8.onrender.com/blogs";
      const response = await fetch(url);
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data);
      } catch (error) {
        setError(error.message);
      }
    };
    retrieveBlogs();
  }, []);

  const renderBlogs = () => {
    return (
      <ul>
        {blogs.length > 0 ? (
          blogs.map((each) => (
            <li key={each.id} className="list-item">
              <Link to={`/blog/${each.id}`} className="head">
                <h4>
                  {each.title} by{" "}
                  <span style={{ fontStyle: "italic" }}> {each.author}</span>
                </h4>
              </Link>
            </li>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </ul>
    );
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <h1 className="title">Blogs 4 You</h1>
      </nav>
      {error ? <p>Error: {error}</p> : renderBlogs()}
    </>
  );
};

export default Home;
