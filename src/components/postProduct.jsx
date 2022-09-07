import { useEffect, useState, useContext } from "react";
import { Modal, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";

const PostModel = ({ handleClose, show, updateUi }) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    category: "",
    location: "",
    image: null,
    poster: ""
  });

  const [categories, setCategories] = useState([
    "Accessories",
    "Beauty",
    "Books",
    "Electronics",
    "Fashion",
    "Home",
    "Mobility",
    "Others"
  ]);

  const [fileError, setFileError] = useState(false);

  let formData = new FormData();
  formData.append("title", product.title);
  formData.append("price", product.price);
  formData.append("condition", product.condition);
  formData.append("category", product.category);
  formData.append("location", product.location);
  formData.append("description", product.description);
  formData.append("image", product.image);
  formData.append("poster", product.poster);

  const onFileChange = (e) => {
    if (e.target && e.target.files[0] && e.target.files[0].size < 1000000) {
      setFileError(false);
      setProduct({ ...product, image: e.target.files[0] });
    } else {
      setFileError(true);
      return;
    }
  };

  let formIsValid = false;
  if (
    product.title &&
    product.price &&
    product.location &&
    product.description &&
    product.image !== null
  ) {
    formIsValid = true;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios

      .get("http://localhost:3001/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setProduct({ ...product, poster: res.data._id });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(product);
    await axios
      .post("http://localhost:3001/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        updateUi(res.data.product);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ width: "28rem" }} onSubmit={postProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={product.title}
                onChange={(event) =>
                  setProduct({ ...product, title: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={product.description}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    description: event.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={product.price}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    price: event.target.value
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Condition</Form.Label>
              <Form.Control
                as="select"
                value={product.condition}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    condition: event.target.value
                  })
                }
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={product.category}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    category: event.target.value
                  })
                }
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={product.location}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    location: event.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) =>
                  setProduct({
                    ...product,
                    image: event.target.files[0]
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!formIsValid}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostModel;
