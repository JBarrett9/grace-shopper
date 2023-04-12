const BASE_URL = "https://sauceboss-rf2u.onrender.com/api"

export async function registerUser(email, name, password, guest) {
  const url = `${BASE_URL}/users/register`;
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
  const url = `${BASE_URL}/users/login`;
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

export async function updateUser(
  name,
  email,
  active,
  admin,
  guest,
  birthday,
  token,
  id
) {
  const response = await fetch(`${BASE_URL}/users/${id}/admin`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      email,
      active,
      admin,
      guest,
      birthday,
    }),
  });
  const result = await response.json();
  console.log(result);
  return result;
}

export async function fetchMe(token) {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
}

export async function fetchActiveUserOrder(token, id) {
  const response = await fetch(`${BASE_URL}/orders/${id}/active`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  return result;
}
