const BASE_URL = "http://localhost:3000";

export async function registerUser(email, password, name) {
    try {
        const response = await fetch(`${BASE_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
            }),
        });
        const result = await response.json();
        console.log(result);

        return result;
    } catch (error) {
        throw error;
    }
}

export async function loginUser(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const result = await response.json();
        console.log(result);

        return result;
    } catch (error) {
        throw error;
    }
}
