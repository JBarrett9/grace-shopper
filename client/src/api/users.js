const BASE_URL = "http://localhost:3000";

export async function registerUser(email, password, name) {
  const url = `/api/users/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error registering user.");
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

export async function fetchMe(token) {
  const response = await fetch(`/api/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log("fetchMe result", result);
  return result;
}
