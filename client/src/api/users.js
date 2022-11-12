const BASE_URL = "http://localhost:3000";

export async function registerUser(email, password, name, guest) {
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
        guest: guest,
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
  const url = `/api/users/login`;
  try {
    const response = await fetch(url, {
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
    return result;
  } catch (error) {
    console.error("Error logging in user.");
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
  return result;
}
