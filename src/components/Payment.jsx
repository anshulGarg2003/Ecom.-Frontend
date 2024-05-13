import React from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { addMode } from "../redux/newCartRedux";

const Heading = styled.div`
  border: 1px solid;
  padding: 10px;
  width: 95%;
  font-size: xx-large;
  background: #13c7f9;
  font-weight: 600;
`;

const PaymentBox = styled.div`
  position: relative;
  display: flex;
  width: 95%;
  align-items: center;
  height: 15vh;
  padding: 0px 10px;
  background-color: white;
  z-index: 100;
  box-shadow: 10px 10px 25px;
  margin: 15px 0;
  cursor: pointer;
  justify-content: space-between;
`;

const PaymentMode = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  gap: 5px;
`;
const SelectInput = styled.input`
  padding: 10px;
  font-size: 25px;
  border: 0px;
`;

const Payment = () => {
  const dispatch = useDispatch();
  const handleSelect = (modeSelect) => {
    dispatch(addMode(modeSelect));
  };
  return (
    <div>
      <Heading>Select Payment Method</Heading>
      <PaymentBox>
        <PaymentMode>
          <SelectInput
            type="radio"
            id="COD"
            name="selectaddress"
            onClick={() => handleSelect({ modeSelect: "COD" })}
          />
          <label for="COD">COD(Cash On Delivery)</label>
        </PaymentMode>
      </PaymentBox>
      <PaymentBox>
        <PaymentMode>
          <SelectInput
            type="radio"
            id="UPI"
            name="selectaddress"
            onClick={() => handleSelect({ modeSelect: "UPI" })}
          />
          <label for="UPI">UPI(PAYTM/Amazon UPI/BHIM)</label>
        </PaymentMode>
      </PaymentBox>
    </div>
  );
};

export default Payment;
