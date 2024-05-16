import React from "react";
import { styled } from "styled-components";
const Summary = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  width: 100%;
  margin: 0px 10px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  /* border: 1px solid black; */
`;

const SummaryTitle = styled.h1`
  margin: 10px;
  margin-top: 15px;
  text-align: center;
`;

const SummaryItem = styled.div`
  margin: 13px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-size: ${(props) => props.type === "total" && "30px"};
  font-weight: ${(props) => props.type === "total" && "600"};
`;

const SummaryText = styled.span``;

const SummaryPrice = styled.span``;

const OrderSummary = ({ cart }) => {
  return (
    <>
      <Summary>
        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
        <SummaryItem>
          <SummaryText>SubTotal</SummaryText>
          <SummaryPrice>${cart.amount}</SummaryPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryText>Shipping Charge</SummaryText>
          <SummaryPrice>$4.5</SummaryPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryText>Shipping Discount</SummaryText>
          <SummaryPrice>-$4.5</SummaryPrice>
        </SummaryItem>
        <SummaryItem type="total">
          <SummaryText>Total</SummaryText>
          <SummaryPrice>${cart.amount}</SummaryPrice>
        </SummaryItem>
        {/* <StripeCheckOut
                name="Scarlet Sage Shop"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLDxrNKARCeY2GLpFjDdkvFsMUHWjjHs6cZoj2yXhwRhY8LSlFSYSpDE62q3KrgmxNEmQ&usqp=CAU"
                billingAddress
                shippingAddress
                description={`Your Total amount is $${cart.amount}`}
                amount={cart.amount * 100}
                token={onToken}
                stripeKey={KEY}
              > */}
        {/* </StripeCheckOut> */}
      </Summary>
    </>
  );
};

export default OrderSummary;
