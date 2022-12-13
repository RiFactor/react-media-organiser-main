import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import { MediaFile } from "src/pages/mediaFile";
// import Categories from "src/components/categories";

const apiEndPoint = "http://localhost:8080";
const mediaFilesEndpoint = apiEndPoint + "/mediafiles";
const categoriesEndPoint = apiEndPoint + "/categories";

const NewMediaFileForm = () => {
  const [newMediaName, setNewMediaName] = useState("");
  const [mediaInput, setMediaInput] = useState(null);
  const [imageInput, setImageInput] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetch(categoriesEndPoint).then((res) => {
      res.json().then((data) => {
        setCategories(data);
      });
    });
  }, []);

  const handleCategorySelected = (event) => {
    let selection = [...selectedCategories];
    // append or splice
    if (event.currentTarget.checked) {
      selection = [...selection, event.currentTarget.value];
    } else {
      const index = selection.findIndex((i) => i === event.currentTarget.value);
      selection.splice(index, 1);
    }
    console.log(selection, "SELECTION HERE");
    setSelectedCategories(selection);
  };

  const handleMediaFileSubmitted = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", newMediaName);
    formData.append("mediaFile", mediaInput.files[0]);
    formData.append("image", imageInput.files[0]);
    for (var i = 0; i < selectedCategories.length; i++) {
      formData.append(`categories[${i}]`, selectedCategories[i]);
      console.log(selectedCategories[i], "loop");
    }
    console.log(selectedCategories, "sc");

    fetch(mediaFilesEndpoint, {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((data) => {
        fetch(mediaFilesEndpoint).then((res) => {
          res.json().then(() => {
            setNewMediaName("");
            setImageInput(null);
            setMediaInput(null);
          });
        });
      });
    });
    // window.history.push("/mediafiles");
  };

  return (
    <div>
      <Link
        to="/mediafiles"
        className="btn btn-primary"
        style={{ marginBottom: 10 }}
      >{`< Back`}</Link>
      <div className="vstack gap-3">
        <form onSubmit={handleMediaFileSubmitted}>
          <div>
            <input
              style={{ marginBottom: 10 }}
              type="text"
              name="name"
              placeholder="Enter Name Here"
              value={newMediaName}
              onChange={(event) => {
                setNewMediaName(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div>
            <label>
              Select Categories
              {categories.map((category) => {
                return (
                  <div key={category.id}>
                    <input
                      value={category.id}
                      type="checkbox"
                      onChange={handleCategorySelected}
                    />
                    <span>{category.name}</span>
                  </div>
                );
              })}
            </label>
          </div>
          <div>
            <label style={{ marginBottom: 10 }}>
              Upload Media File - required
              <input
                name="media"
                type="file"
                ref={setMediaInput}
                // accept="audio/aac, audio/mp3, audio/wav, video/mp4, video/avi"
                accept="audio/*,video/*"
              ></input>
            </label>
          </div>
          <div>
            <label style={{ marginBottom: 10 }}>
              {`Upload Image (optional)`}
              <input
                name="image"
                type="file"
                ref={setImageInput}
                accept="image/jpeg, image/jpg, image/png"
              ></input>
            </label>
          </div>
          <button type="Submit" className="btn btn-primary">
            Add Media File
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewMediaFileForm;
