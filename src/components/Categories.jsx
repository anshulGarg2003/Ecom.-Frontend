import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethos";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Container = styled.div`
  display: flex;
  padding: 10px;
  /* width: 100%; */
  justify-content: space-around;
  gap: 5px;
  overflow-x: auto;
  /* scroll-behavior: smooth; */
  position: relative;
  ${mobile({ flexDirection: "column", alignItem: "center" })};

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollButton = styled.button`
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

const ArrowIcon = styled.div`
  color: #000;
`;

const Content = styled.div`
  display: flex;
  gap: 5px;
`;

const Loader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;

const Categories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 250; // Adjust scroll amount as needed

    if (direction === "left") {
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await publicRequest.get("/categorydata");
        // console.log(res.data);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Container>
        <ScrollButton direction="left" onClick={() => scroll("left")}>
          <ArrowIcon>
            <IoIosArrowBack size={24} />
          </ArrowIcon>
        </ScrollButton>
        <Container ref={containerRef}>
          {loading === true ? (
            <Loader>
              <img
                src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
                alt=""
                height="30px"
              />
            </Loader>
          ) : (
            <>
              <Content>
                {data.map((item) => (
                  <CategoryItem item={item} key={item._id} />
                ))}
              </Content>
            </>
          )}
        </Container>
        <ScrollButton direction="right" onClick={() => scroll("right")}>
          <ArrowIcon>
            <IoIosArrowForward size={24} />
          </ArrowIcon>
        </ScrollButton>
      </Container>
    </>
  );
};

export default Categories;
