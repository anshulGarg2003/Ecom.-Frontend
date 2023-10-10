import { useState } from "react";
import { styled } from "styled-components";
import { login } from "../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  ${mobile({ height: "80vh" })}
  width: 100vw;
  background: url("https://4.bp.blogspot.com/-EIt2T3yiQTI/WX7v1HCpXII/AAAAAAAADis/C7DVb4ud_n08OsO0s7bLJ5vK5D9UeWtrQCLcBGAs/s1600/photo-8434.jpg")
    center;
  background-size: cover;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 25px;
  width: 25%;
  ${mobile({ width: "55%" })}
  display: flex;
  flex-direction: column;
  background-color: rgb(250, 235, 215, 0.8);
  justify-content: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Input = styled.input`
  padding: 5px;
  margin: 5px 0;
  font-size: 13px;
`;

const Button = styled.button`
  margin-bottom: 5px;
  width: 30%;
  padding: 10px;
  border-radius: 10px;
  font-weight: 400;
  border: 1px solid black;
  background-color: white;
  &:hover {
    font-weight: 600;
    background-color: #fad3a0;
    cursor: pointer;
  }

  &:disabled {
    background-color: #fce3c1;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            type="text"
            placeholder="username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>
        <Button onClick={handleClick}>LOGIN</Button>
        {{ isFetching } == true ? (
          <span style={{ color: "green" }}>Please Wait...</span>
        ) : (
          { error } && <Error>{error}</Error>
        )}
        <Link style={{ textDecoration: "underline", color: "inherit" }}>
          Forget Password?
        </Link>
        <Link
          to="/register"
          style={{ textDecoration: "underline", color: "inherit" }}
        >
          Create Account
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Login;
