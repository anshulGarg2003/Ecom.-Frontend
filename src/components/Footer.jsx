import { styled } from "styled-components";
import { Facebook, Instagram, Twitter,Phone,MailOutlined,Room } from "@mui/icons-material";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  ${mobile({flexDirection:"column",textAlign:"center"})}

`;

const Left = styled.div`
  flex: 1;
  flex-direction: column;
`;
const Logo = styled.h1``;
const Description = styled.p`
    margin: 20px 0px;
    ${mobile({margin:"10px 0"})}

`;

const SocialContainer = styled.div`
    display: flex;
    ${mobile({alignItems:"center",justifyContent:"center"})}
`;

const SocialIcon = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({width:"50px",height:"50px"})}

`;

const Center = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const Title=styled.h3`
    margin-bottom: 30px;
`;
const List=styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem=styled.li`
    width: 50%;
    margin-bottom: 5px;
`;

const Right = styled.div`
  flex: 1;
`;

const ContactItem=styled.div`
    margin-bottom: 5px;
    display: flex;
    align-items: center;
`

const Payment=styled.img`
    width: 275px;
    height: 100px;
`

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Scarlet Sage Shop</Logo>
        <Description>
        Discover a world of timeless elegance and contemporary style at The Scarlet Sage Shop. We curate a collection of meticulously crafted clothing that embodies sophistication, comfort, and individuality.
        <br/>
        <br/>
        Explore our latest arrivals and elevate your wardrobe with pieces that inspire confidence and radiate elegance. Join us on a journey of style, where every garment tells a story.
        </Description>
        <SocialContainer>
          <SocialIcon>
            <Facebook />
          </SocialIcon>
          <SocialIcon>
            <Instagram />
          </SocialIcon>
          <SocialIcon>
            <Twitter />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>
            Useful Links
        </Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Women Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
            <ListItem>My Cart</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
            <Room style={{marginRight:"10px"}}/>123 Elm Street Springfield, IL 62701 United States
        </ContactItem>
        <ContactItem>
            <Phone style={{marginRight:"10px"}}/>+91-1123456789
        </ContactItem>
        <ContactItem>
            <MailOutlined style={{marginRight:"10px"}}/>contact@ScarletSageShop.com
        </ContactItem>
        <Payment src="data:image/png;base64,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"/>
      </Right>
    </Container>
  );
};

export default Footer;
