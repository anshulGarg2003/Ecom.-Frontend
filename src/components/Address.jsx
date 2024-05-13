import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { MdAddHome } from "react-icons/md";
import { publicRequest } from "../requestMethos";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { addAddress } from "../redux/newCartRedux";

const Heading = styled.div`
  border: 1px solid;
  padding: 10px;
  width: 95%;
  font-size: xx-large;
  background: #13c7f9;
  font-weight: 600;
`;

const AddressBox = styled.div`
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

const UserAddBox = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  gap: 5px;
`;

const ButtonBox = styled.div``;

const Input = styled.input`
  padding: 10px;
  font-size: 17px;
  /* width: 6%; */
  border: 0px;
`;
const SelectInput = styled.input`
  padding: 10px;
  font-size: 25px;
  border: 0px;
`;

const Button = styled.button`
  padding: 5px 35px;
  font-size: 15px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid black;
`;

const Address = () => {
  const user = useSelector((state) => state.user);
  const [add, setAdd] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [addNewAddress, setAddNewAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState("");
  const dispatch = useDispatch();
  const handleDelete = async (index) => {
    setLoading(true);
    try {
      const res = await publicRequest.put(
        `/users/deleteaddress/${user.userId}`,
        { index }
      );
      alert(res.data.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    if (addNewAddress === "") {
      alert("Please Enter Address");
      setLoading(false);
      return;
    }
    console.log(pincode);
    if (pincode === "" || pincode.length > 6 || !/^\d+$/.test(pincode)) {
      alert("Please Enter Correct Pincode");
      setLoading(false);
      return;
    }

    const finalAddress = addNewAddress + "," + pincode;
    try {
      const formdata = new FormData();
      formdata.append("newAddress", finalAddress);
      const res = await publicRequest.post(
        `/users/addaddress/${user.userId}`,
        formdata
      );
      // console.log(res);
      alert(res.data.message);
      setLoading(false);
      setAdd(false);
      setAddNewAddress("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = (address) => {
    dispatch(addAddress(address));
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        const res = await publicRequest.get(`/users/getaddress/${user.userId}`);
        console.log(res.data);
        setUserAddress(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAddress(); // Call the getAddress function here
  }, [loading, user.userId]);

  return (
    <>
      <div>
        <Heading>Select Address</Heading>
        {userAddress &&
          userAddress.map((address) => (
            <AddressBox key={address}>
              <UserAddBox>
                <SelectInput
                  type="radio"
                  name="selectaddress"
                  id={address}
                  onClick={() => handleSelect(address)}
                />
                <label for={address}>{address}</label>
              </UserAddBox>
              <ButtonBox>
                <MdOutlineDeleteOutline
                  size={30}
                  onClick={() => handleDelete(userAddress.indexOf(address))}
                />
              </ButtonBox>
            </AddressBox>
          ))}
        {add && (
          <AddressBox>
            <Input
              value={addNewAddress}
              onChange={(e) => setAddNewAddress(e.target.value)}
              placeholder="Enter Address..."
              type="text"
            />
            <Input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter Pincode..."
              type="text"
            />
            <Button onClick={() => handleSave()}>Save</Button>
          </AddressBox>
        )}
        <AddressBox onClick={() => setAdd(true)}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdAddHome size={30} />
            Add Address...
          </div>
        </AddressBox>
      </div>
    </>
  );
};

export default Address;
