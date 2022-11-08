import { Link } from "react-router-dom";
import styled from "styled-components"
const Header = () => {
    return (
        <StyledComponent>
            <div className="logo">
                <NavLink to={"/"}>logo</NavLink>
            </div>
            <div className="user-creds">
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/signup"}>Sign Up</NavLink>
                <NavLink to={"/cart"}>Cart</NavLink> 
            </div>
            <nav>
            
                <NavLink to={"/menu"}>Menu</NavLink>
                <NavLink to={"/featured"}>Featured</NavLink>
                 
            </nav>
        </StyledComponent>
    )
}
const StyledComponent = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
height: 15vh;
justify-content: space-between;
padding: 10px;
align-items: center;
background-color: aliceblue;
.user-creds {
    display: flex;
    justify-content: flex-end;
   
    padding: 5px;
    >*{
        margin: 5px 10px;
        border: 1px solid black;
        padding: 10px;
    } 
     
}
nav{
    padding: 10px;

    >*{
        margin: 0 10px;
        background-color: violet;
        padding: 10px;
    }
}
.logo{
    padding: 10px 20px;
}
`;

const NavLink = styled(Link)`
color: black;
text-decoration: none;
`
export default Header;