import React from "react";
import { styled } from "styled-components";
import { NEW_URL } from "../requestMethos";

const Container = styled.div`
  height: 500px;
  width: 100%;
  margin: 10px;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${(props) => (props.highlight ? "#dddddd" : "inherit")};
  /* background-color:{highlight === true ? aqua : inherit} */
`;

const ImgBox = styled.div`
  display: flex;
  flex: 6;
  /* border: 1px solid black; */
  align-items: center;
  justify-content: center;
`;

const DetailsBox = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  flex: 4;
  border: 1px solid black;
  padding: 5px;
  justify-content: space-between;
`;

const Content = styled.div`
  font-size: large;
  padding: 3px;
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  height: 30px;
`;

const SingleCart = ({ order, onViewCart, isSelected }) => {
  const FormatDate = () => {
    const dateString = order.updatedAt;
    const dateObject = new Date(dateString);

    // Get the month name from the date
    const options = { month: "long" };
    const monthName = dateObject.toLocaleDateString("en-US", options);

    return monthName;
  };
  // console.log(isSelected);
  return (
    <>
      <Container highlight={isSelected}>
        <ImgBox>
          <div
            style={{
              height: "90%",
              width: "70%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "300px",
                alignItems: "center",
              }}
            >
              {order.products.slice(0, 3).map((product, index) => (
                <React.Fragment key={index}>
                  <img
                    src={`${NEW_URL}/${product.product.img}`}
                    alt=""
                    height="300px"
                    width="90%"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: index * 30 + "px", // Adjust the spacing between images
                      zIndex: order.products.length - index, // Set z-index to create overlapping effect
                      border: "1px solid black",
                      borderRadius: "300px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Optional: add shadow for depth
                      // transform: `rotate(${index * 5}deg)`, // Optional: rotate images for a dynamic effect
                    }}
                  />
                  {index === 2 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "3rem",
                        color: "white",
                        backgroundColor: "black",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: order.products.length + 1,
                      }}
                    >
                      +
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </ImgBox>
        <DetailsBox>
          <Content>
            <p>Order ID:-</p>
            <p>{order._id}</p>
          </Content>
          <Content>
            <p>Quantity:-</p>
            <p>{order.products.length}</p>
          </Content>
          <Content>
            <p>Amount:-</p>
            <p>${order.totalAmount}</p>
          </Content>
          <Content>
            <p>Purchase Date:-</p>
            <p>{FormatDate()}</p>
          </Content>
        </DetailsBox>
        <Button onClick={() => onViewCart(order)}>View Cart</Button>
      </Container>
    </>
  );
};

export default SingleCart;
