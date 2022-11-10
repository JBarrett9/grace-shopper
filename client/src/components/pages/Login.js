import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../../api/users";

const Login = (props) => {
    const { setIsLoggedIn, setUser, setToken } = props;
    const [error, setErrMessage] = useState("");
    const navigate = useNavigate();

    return (
        <StyledComponent>
            <h2>Login</h2>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();

                    const formData = new FormData(event.target);
                    const user = {
                        email: formData.get("Email"),
                        password: formData.get("Password"),
                    };

                    const result = await loginUser(user.email, user.password);

                    if (!result.error) {
                        setIsLoggedIn(true);
                        setToken(result.token);
                        setUser(result.user);

                        localStorage.setItem("token", result.token);
                        navigate("/");
                    } else {
                        setIsLoggedIn(false);
                        setErrMessage(result.message);
                    }
                }}
            >
                <div className="form-data">
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        required
                    ></input>
                </div>
                <div className="form-data">
                    <label htmlFor="Password">Password</label>
                    <input
                        type="password"
                        id="Password"
                        name="Password"
                        required
                    ></input>
                </div>
                <div className="message">
                    <h5>{error}</h5>
                </div>
                <button type="submit">Submit</button>
            </form>
        </StyledComponent>
    );
};
const StyledComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 85vh;
    padding: 5vw;
    form {
        width: 400px;
        height: 500px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        display: flex;
        flex-direction: column;
        padding: 20px;
        .form-data {
            display: flex;
            flex-direction: column;
            padding: 10px;
            margin: 10px;
            font-size: 24px;
            input {
                padding: 10px;
                margin: 20px 0;
                border: none;
                outline: none;
                border-radius: 10px;
                font-size: 20px;
                background-color: aliceblue;
            }
        }
        .message {
            padding: 10px;
            margin: 10px;
        }
        button {
            margin: 20px;
            border: none;
            background-color: navy;
            color: white;
            padding: 20px;
            border-radius: 10px;
        }
    }
`;
export default Login;
