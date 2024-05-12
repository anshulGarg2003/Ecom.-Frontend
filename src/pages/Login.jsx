import { useState } from "react";
import { styled } from "styled-components";
import { login } from "../redux/apiCall";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  display: flex;
  opacity: 0.8;
  height: 85vh;
  background: url("https://dminteriors.lk/wp-content/uploads/2021/09/Cloth-Shop-Interior-Design-Ideas-4.jpg")
    no-repeat center;
  background-size: cover;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 25px;
  display: flex;
  width: 25%;
  height: 65%;
  ${mobile({ width: "55%" })}
  flex-direction: column;
  background-color: rgb(250, 235, 215, 0.8);
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  opacity: 0;
  cursor: pointer;

  &:hover {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 65%;
`;
const Input = styled.input`
  padding: 5px;
  margin: 5px 0;
  font-size: 17px;
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

const BackgroudImgBox = styled.div`
  display: flex;
  flex: 6;
  background: #b15757;
`;

const SliderImg = styled.img`
  object-fit: "cover";
`;

const Login = () => {
  // const navigate=UseNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("passi", password);
    formdata.append("isAdmin", isAdmin === "yes" ? true : false);
    const res = await login(dispatch, formdata);
    console.log(res);
    if (res === true) {
      setLoading(false);
      history.push("/");
    } else {
      setLoading(false);
      setError(res);
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              type="text"
              placeholder="Username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <label htmlFor="yes">Are You Admin </label>
              <Input
                type="radio"
                id="yes"
                name="isAdmin"
                value="yes"
                checked={isAdmin === "yes"}
                onChange={(e) => setIsAdmin(e.target.value)}
              />
              <label htmlFor="yes">Yes</label>

              <Input
                type="radio"
                id="no"
                name="isAdmin"
                value="no"
                checked={isAdmin === "no"}
                onChange={(e) => setIsAdmin(e.target.value)}
              />
              <label htmlFor="no">No</label>
            </div>
          </Form>
          <Button onClick={handleClick}>LOGIN</Button>
          {loading ? (
            <span style={{ color: "green" }}>Please Wait...</span>
          ) : (
            error && <Error>{error}</Error>
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
        {/* <BackgroudImgBox>{<SliderImg src="" alt="slider" />}</BackgroudImgBox> */}
      </Container>
    </>
  );
};

export default Login;
