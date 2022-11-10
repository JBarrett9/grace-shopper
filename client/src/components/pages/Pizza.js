import styled from "styled-components";

const Pizza = ({item}) => {
    return (
        <StyledComponent>
            <img src="https://tse3.mm.bing.net/th?id=OIP.4Ne-xruBRf7EMljmGWx0aAHaFj&pid=Api&P=0" alt="pizza"/>
            <div className="info">
                <h2>{item.toppings}</h2>
                <p>{item.crust}</p>
                <p>{item.price}</p>
                <select>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                    <option>Extra Large</option>
                </select>
                <input type="number" min="1" max="20"/>
                <select>
                    <option>Crust</option>
                    <option>Original Crust</option>
                    <option>Large</option>
                    <option>Extra Large</option>
                </select>
            </div>
        </StyledComponent>
    )
}
const StyledComponent = styled.div `
    
    width: 300px;
    height: 400px;
    background-color: white;
    img{
        width: 300px;
        height: 200px;
    }
    .info{
        background-color: white;
        height: 200px;
        padding: 20px;
    }
`
export default Pizza;