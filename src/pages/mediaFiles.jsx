import "src/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// states

// functions

// map the list of media

// call API to add and delete, then patch

const apiEndPoint = "http://localhost:8080";
const mediaFilesEndpoint = apiEndPoint + "/mediafiles";

function MediaFiles() {
  const [mediaFiles, setMediaFiles] = useState([]);

  // ADD MEDIA FILE
  const [newMediaName, setNewMediaName] = useState("");
  // const [mediaInput, setMediaInput] = useState(null);
  const [imageInput, setImageInput] = useState(null);

  useEffect(() => {
    console.log(mediaFilesEndpoint, "end point");
    fetch(mediaFilesEndpoint).then((res) => {
      res.json().then((data) => {
        console.log(mediaFilesEndpoint, "end point");
        console.log(data, "data");
        setMediaFiles(data);
      });
    });
  }, []);

  const handleMediaFileSubmitted = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", newMediaName);
    formData.append("image", imageInput.files[0]);

    fetch(mediaFilesEndpoint, {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((data) => {
        fetch(mediaFilesEndpoint).then((res) => {
          res.json().then((data) => {
            setMediaFiles(data);
            setNewMediaName("");
            setImageInput(null);
            // setMediaInput(null);
          });
        });
      });
    });
  };

  const handleDeleteMediaFile = (mediaFileId) => {
    // API call
    fetch(`${mediaFilesEndpoint}/${mediaFileId}`, { method: "DELETE" }).then(
      (res) => {
        res.json().then((data) => {
          fetch(mediaFilesEndpoint).then((res) => {
            res.json().then((data) => {
              setMediaFiles(data);
            });
          });
        });
      }
    );
  };

  return (
    <>
      <div>
        <div>
          <h1>Media Files</h1>
          <Link
            to="/newMediaFile"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Add Media File
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Song</th>
              <th>Comment</th>
              <th>{`<3`}</th>
              <th>Categories</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mediaFiles.map((mediaFile) => {
              return (
                <tr key={mediaFile.id}>
                  <td>
                    <img src={mediaFile.image} width="50" alt=""></img>
                  </td>
                  <td>{mediaFile.name}</td>
                  <td>{mediaFile.comment}</td>
                  <td>{mediaFile.isLiked}</td>
                  <td>{mediaFile.categories}</td>
                  <td>{mediaFile.id}</td>
                  <td>
                    <button className="btn btn-info">View</button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleDeleteMediaFile(mediaFile.id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <form onSubmit={handleMediaFileSubmitted}>
            <input
              type="text"
              name="name"
              placeholder="Enter Name Here"
              value={newMediaName}
              onChange={(event) => {
                setNewMediaName(event.currentTarget.value);
              }}
            ></input>
            <input
              name="image"
              type="file"
              ref={setImageInput}
              accept="image/jpeg, image/jpg, image/png"
            ></input>
            <button type="Submit" className="btn btn-primary">
              Add Media File
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MediaFiles;
