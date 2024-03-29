// import { Form, Button } from "react-bootstrap";
// import { Row, Container, Col } from "react-bootstrap";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import React from "react";

// const Login = () => {
//   const navigate = useNavigate();
//   const [successfullyLogedIn, setSuccessfullyLogedIn] = useState(false);

//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });

//   const onChangeHandler = (value, fieldToSet) => {
//     setUser({
//       ...user,
//       [fieldToSet]: value,
//     });
//   };
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const loginUrl = "http://localhost:3001/users/login";
//       const postOptions = {
//         method: "POST",
//         body: JSON.stringify(user),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const response = await fetch(loginUrl, postOptions);
//       if (response.ok) {
//         navigate("/");

//         const result = await response.json();
//         console.log(result);
//         const getUrl = "http://localhost:3001/users/me";
//         const authorizationBearerToken = `Bearer ${result.accessToken}`;
//         const getOptions = {
//           headers: {
//             Authorization: authorizationBearerToken,
//           },
//         };
//         const getResponse = await fetch(getUrl, getOptions);
//         if (getResponse.ok) {
//           const authors = await getResponse.json();
//           console.log(authors);
//         }
//       } else {
//         console.log("something went wrong :(");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//     <Container>
//       <Row className={"justify-content-center mt-5"}>
//         <Col xs={12} md={6}>
//           <Form onSubmit={onSubmit}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 required
//                 value={user.email}
//                 onChange={(e) => {
//                   onChangeHandler(e.target.value, "email");
//                 }}
//               />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 required
//                 value={user.password}
//                 onChange={(e) => {
//                   onChangeHandler(e.target.value, "password");
//                 }}
//               />
//             </Form.Group>
//             <Button
//               variant="primary"
//               type="submit"
//               onClick={() => {
//                 if (successfullyLogedIn === true) {
//                   navigate("/");
//                 }
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//     </>
//   );
// };

// export default Login;

import { Form, Button } from "react-bootstrap";
import { Row, Container, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  const onChangeHandler = (value, fieldToSet) => {
    const updatedAuth = {
      ...user,
      [fieldToSet]: value,
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
    navigate("/");
  };

  return (
    <>
      <Container>
        <Row className={"justify-content-center mt-5"}>
          <Col xs={12} md={6}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={user?.email}
                  onChange={(e) => {
                    onChangeHandler(e.target.value, "email");
                  }}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={user?.password}
                  onChange={(e) => {
                    onChangeHandler(e.target.value, "password");
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
