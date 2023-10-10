import { Send } from "@mui/icons-material"
import { styled } from "styled-components"
import { mobile } from "../responsive";

const Container=styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    ${mobile({height:"50vh"})}

`

const Title=styled.h1`
    font-size: 60px;
    margin: 10px;
    ${mobile({fontSize:"50px",margin:"10px"})}

`
const Description=styled.div`
    width: 85%;
    font-size: 30px;
    font-weight: 300px;
    margin-bottom: 20px;
    ${mobile({fontSize:"20px",margin:"15px"})}

`
const InputContainer=styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({width:"80%"})}
    
`
const Input=styled.input`
    border: none;
    flex: 8;
    font-size: 15px;
    padding-left: 10px;
    
`
const Button=styled.button`
    flex: 1;
    border: 0.5px;
    cursor: pointer;
    background-color: #008080c9;
`

const NewsLetter = () => {
  return (
    <Container>
        <Title>NewsLetter</Title>
        <Description>Stay in the loop with the latest trends and exclusive offers! Share your email address with us to receive all the exciting updates from The Scarlet Sage Shop.</Description>
        <InputContainer>
            <Input placeholder="Type your Email..."/>
            <Button>
                <Send/>
            </Button>
        </InputContainer>
    </Container>
  )
}

export default NewsLetter