import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiEndPoint = "http://localhost:8080";
const categoriesEndPoint = apiEndPoint + "/categories";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(categoriesEndPoint).then((res) => {
      res.json().then((data) => {
        setCategories(data);
      });
    });
  }, []);
  return (
    // to link to filtered list of categories by passing id in param
    <div>
      <ul>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <Link to="/mediaFiles">{category.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
