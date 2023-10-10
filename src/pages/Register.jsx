import { useState } from "react";
import { register } from "../redux/apiCall";
import { mobile } from "../responsive";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url("https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60") center;
  background-size: cover;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 40px;
  ${mobile({ padding: "20px", width: "55%" })}
  width: 50%;
  display: flex;
  margin: auto;
  flex-direction: column;
  background-color: rgb(250, 235, 215, 0.8);
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  ${mobile({ marginBottom: "10px", fontSize: "15px" })}
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const Input = styled.input`
  padding: 5px;
  width: 40%;
  margin: 5px;
  font-size: 13px;
  ${mobile({ width: "37%", fontSize: "9px" })}
`;

const Agreement = styled.p`
  margin: 10px 0;
  font-size: 15px;
  ${mobile({ marginBottom: "10px", marginTop: "0px", fontSize: "10px" })}
`;
const Button = styled.button`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  font-weight: 400;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  &:hover {
    font-weight: 600;
    background-color: #fad3a0;
  }
  ${mobile({ fontSize: "9px" })}
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { firstname, username, password, email });
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE YOUR ACCOUNT</Title>
        <Form>
          <Input
            type="text"
            placeholder="FirstName..."
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Input type="text" placeholder="LastName..." />
          <Input
            type="text"
            placeholder="UserName..."
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Type Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password..."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input type="password" placeholder="Confirm Password..." />
        </Form>
        {{ isFetching } == true ? (
          <span style={{ color: "green" }}>Please Wait...</span>
        ) : (
          { error } && <Error>{error}</Error>
        )}
        <Agreement>
          By using our services, you agree to our <b>PRIVACY POLICY </b>. We
          prioritize your data security and only use it for essential purposes,
          ensuring confidentiality and compliance with legal standards.
        </Agreement>
        <Button onClick={handleClick}>CREATE ACCOUNT</Button>
        <Link
          to="/login"
          style={{ textDecoration: "underline", color: "inherit" }}
        >
          Already Account!!
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Register;
