import styled from "styled-components";

const Signup = () => {
    return (
        <StyledComponent>
            <h2>Create Your Account</h2>
            <form>
                <div className="form-data">
                    <label for="Name">Name</label>
                    <input type="text" id="Name" required></input>
                </div>
                <div className="form-data">
                    <label for="Email">Email</label>
                    <input type="email" id="Email" required></input>
                </div>
                <div className="form-data">
                    <label for="Password">Password</label>
                    <input type="password" id="Password" required></input>
                </div>
                <div className="message">
                    <h5>message</h5>
                </div>
                <button type="submit">Submit</button>
            </form>
        </StyledComponent>
    )
}
const StyledComponent = styled.div `
width: 100vw;
height: 85vh;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
padding: 5vw;
form{
    
    width: 400px;
    height: 550px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
    padding: 10px;
    .form-data{
        display: flex;
        flex-direction: column;
        padding: 20px;
        font-size: 24px;
        box-sizing: content-box;
        label{
            font-size: 18px;
            margin: 10px 0;
            
        }
        input{
            padding: 10px;
            border-radius: 10px;
            outline: none;
            border: none;
            font-size: 24px;
            background-color: aliceblue;
        }

    }
    .message{
        height: 40px;
        padding: 20px;
    }
    button{
        margin: 20px;
        border: none;
        padding: 20px;
        font-size: 20px;
        background-color: navy;
        color: white;
        font-weight: bold;
        border-radius: 10px;
    }
}
`
export default Signup;
