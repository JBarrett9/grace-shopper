import styled from "styled-components"
import Pizza from "./Pizza"

const Menu = () => {
    let pizzas = [{
        id:1,
        toppings:"ham",
        crust:"fired",
        price:"$10",
    },{
        id:2,
        toppings:"ham",
        crust:"fired",
        price:"$10",
    }]    
    return (
        <StyledComponent>
            <h1>Menu</h1>
            <div className="pizzas">
                {
                    pizzas.map(pizza => {
                        return (
                            <Pizza item={pizza}/>
                        )
                    })
                }
            </div>
        </StyledComponent>
    )
}
const StyledComponent = styled.div`
    background-color: blue;
    padding: 30px 10vw;
    h1 {
        text-align: center;
    }
    .pizzas{
        display: flex;
        padding: 30px;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }
`
export default Menu;