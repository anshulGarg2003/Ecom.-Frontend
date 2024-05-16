import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { mobile } from "../responsive";
import { NEW_URL, publicRequest } from "../requestMethos";
// import { makeRequestWithToken } from "../requestMethos";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const Container = styled.div`
  margin-top: 15px;
  height: 80vh;
  width: 100%;
  display: flex;
  /* background-color: coral; */
  position: relative;
  overflow: hidden;
  ${mobile({ height: "40vh" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f2e9e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  z-index: 2;
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  ${mobile({ height: "42vh" })}
`;
const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 3;
  ${mobile({ flex: 0 })}
`;

const Img = styled.img`
  width: 90%;
  ${mobile({ maxWidth: "375px", minWidth: "375px" })}
`;

const InfoContainer = styled.div`
  flex: 2;
  padding: 30px;
  ${mobile({ flex: 0, display: "none" })}
`;

const Title = styled.h1`
  font-size: 50px;
`;
const Desc = styled.p`
  font-size: 20px;
  margin: 20px 0px;
  letter-spacing: 2px;
`;
const Button = styled.button`
  padding: 5px;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
  border: 0.5px solid;
  border-radius: 5px;
`;

const Loader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sliderdata, setsliderdata] = useState([]);
  const history = useHistory();
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderdata.length - 1);
    }

    if (direction === "right") {
      setSlideIndex(slideIndex < sliderdata.length - 1 ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await publicRequest.get("/sliderdata");
        setsliderdata(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) =>
        prevIndex < sliderdata.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderdata]);

  return (
    <Container>
      {loading === true ? (
        <Loader>
          <img
            src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
            height="50px"
            alt=""
          />
        </Loader>
      ) : (
        <>
          <Arrow direction="left" onClick={() => handleClick("left")}>
            <ArrowLeftOutlined />
          </Arrow>

          <Wrapper slideIndex={slideIndex}>
            {sliderdata.map((item) => (
              <Slide bg={item.bg} key={item.id}>
                <ImgContainer>
                  <Img
                    src={
                      item.img
                        ? `${NEW_URL}/${item.img}`
                        : "https://media.tenor.com/DPEfCqnChk0AAAAi/loading-slow-net.gif"
                    }
                  ></Img>
                </ImgContainer>
                <InfoContainer>
                  <Title>{item.title}</Title>
                  <Desc>{item.desc}</Desc>
                  <Button onClick={() => history.push("/products/")}>
                    Visit Now
                  </Button>
                </InfoContainer>
              </Slide>
            ))}
          </Wrapper>
          <Arrow direction="right" onClick={() => handleClick("right")}>
            <ArrowRightOutlined />
          </Arrow>
        </>
      )}
    </Container>
  );
};

export default Slider;
