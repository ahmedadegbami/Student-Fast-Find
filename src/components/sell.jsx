// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { Container, Form, Button, Row, Modal } from "react-bootstrap";
// import MyProducts from "./myProducts";
// import PostModel from "./postModel";

// const Sell = () => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios

//       .get("http://localhost:3001/users/me", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then((res) => {
//         setProduct({ ...product, poster: res.data._id });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <Container fluid style={{ marginTop: "80px", marginBottom: "80px" }}>
//       <Row className="justify-content-center"></Row>

//       <MyProducts handleShow={handleShow} />
//       {show && <PostModel show={show} handleClose={handleClose} />}
//     </Container>
//   );
// };

// export default Sell;
