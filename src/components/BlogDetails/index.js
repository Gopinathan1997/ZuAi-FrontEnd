import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import "./index.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const [blogData, setBlogData] = useState(null);
  const [isEditTrue, toggleEdit] = useState(false);
  const [updatedtitle, setTitle] = useState("");
  const [updatedContent, setContent] = useState("");
  const [updatedAuthor, setAuthor] = useState("");

  useEffect(() => {
    const getBlogDetails = async () => {
      setApiStatus("IN_PROGRESS");

      try {
        const url = `https://zuai-backend-sfp8.onrender.com/blog/${id}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setBlogData(data);
          setTitle(data.title);
          setContent(data.content);
          setAuthor(data.author);
          setApiStatus("SUCCESS");
        } else {
          setApiStatus("FAILURE");
        }
      } catch (error) {
        setApiStatus("FAILURE");
      }
    };

    getBlogDetails();
  }, [id]);

  const updateTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const updateContentInput = (e) => {
    setContent(e.target.value);
  };

  const updateAuthorInput = (e) => {
    setAuthor(e.target.value);
  };

  const updateBlog = async () => {
    const updatedData = {
      id,
      title: updatedtitle,
      content: updatedContent,
      author: updatedAuthor,
    };

    const url = `https://zuai-backend-sfp8.onrender.com/blog/${id}`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    };

    // try {
    const response = await fetch(url, options);
    console.log("response", response);

    if (response.ok) {
      const result = await response.json();
      console.log("Blog updated successfully:", result);
      toggleEdit(false);
      alert("SuccessFully Updated");
      window.location.reload();
    } else {
      console.error("Failed to update the blog:", response.statusText);
    }
    /* } catch (error) {
      console.error("Error updating the blog:", error);
    } */
  };

  const editPage = () => {
    return (
      <div className="data">
        <div className="mb-3">
          <label>Title: </label>
          <input
            className="form-control"
            value={updatedtitle}
            onChange={updateTitleInput}
          />
        </div>
        <div className="mb-3">
          <label>Content</label>
          <textarea
            className="form-control w-100"
            rows={7}
            onChange={updateContentInput}
            value={updatedContent}
          />
        </div>
        <div className="mb-3">
          <label>Author: </label>
          <input
            className="form-control"
            value={updatedAuthor}
            onChange={updateAuthorInput}
          />
        </div>

        <button className="btn btn-primary d-block" onClick={updateBlog}>
          Update All
        </button>
        {isEditTrue ? (
          <p>After Click Update All, Kindly Reload the Page to Updated View</p>
        ) : (
          ""
        )}
      </div>
    );
  };

  const updateEdit = () => {
    toggleEdit(!isEditTrue);
  };

  const renderBlogDetails = () => {
    if (!blogData) return null;

    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <h1 className="title">Blogs 4 You</h1>
        </nav>
        {isEditTrue ? (
          editPage()
        ) : (
          <>
            <div className="data">
              <div className="d-flex justify-content-between">
                <h1 className="heading">{blogData.title}</h1>
                <button className="edit btn btn-secondary" onClick={updateEdit}>
                  <FaRegEdit />
                  Edit
                </button>
              </div>
              <p>{blogData.content}</p>
              <p>By: {blogData.author}</p>
            </div>
          </>
        )}
      </div>
    );
  };

  switch (apiStatus) {
    case "IN_PROGRESS":
      return <p>Loading...</p>;
    case "SUCCESS":
      return renderBlogDetails();
    case "FAILURE":
      return <p>Failed to load blog details. Please try again later.</p>;
    default:
      return null;
  }
};

export default BlogDetails;
