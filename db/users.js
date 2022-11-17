const client = require("./client");
const bcrypt = require("bcrypt");

const createUser = async ({
  email,
  name,
  password,
  admin,
  birthday,
  guest,
}) => {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  if (guest === null) {
    guest = true;
  }
  if (admin === null) {
    admin = false;
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  if (isValidEmail(email)) {
    const {
      rows: [user],
    } = await client.query(
      `
                  INSERT INTO users(email, name, password, admin, birthday, guest)
                  VALUES ($1, $2, $3, $4, $5, $6)
                  ON CONFLICT (email) DO NOTHING
                  RETURNING id, email;
              `,
      [email, name, hashedPassword, admin, birthday, guest]
    );
    return user;
  } else {
    throw error;
  }
};

async function getUser({ email, password }) {
  const user = await getUserByEmail(email);
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  if (passwordsMatch) {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, email FROM users
      WHERE email=$1
      `,
      [username]
    );
    return user;
  }
}

async function getUserById(userId) {
  console.log("Getting user information for: ", userId);
  const {
    rows: [user],
  } = await client.query(
    `
    SELECT id, email, guest FROM USERS
    WHERE id=$1;
    `,
    [userId]
  );
  return user;
}

const getUserByEmail = async (email) => {
  const {
    rows: [user],
  } = await client.query(
    `
    SELECT * FROM USERS
    WHERE email=$1
    ;`,
    [email]
  );

  return user;
};

const updateUser = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `UPDATE users SET ${setStr} WHERE id=${id} RETURNING *;`,
      Object.values(fields)
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  updateUser,
};
