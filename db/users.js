const client = require("./client");
const bcrypt = require("bcrypt");

const createUser = async ({ email, name, password }) => {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  if (isValidEmail(email)) {
    const {
      rows: [user],
    } = await client.query(
      `
                  INSERT INTO users(email, name, password)
                  VALUES ($1, $2, $3)
                  ON CONFLICT (email) DO NOTHING
                  RETURNING id, email;
              `,
      [email, name, hashedPassword]
    );
    return user;
  } else {
    console.log("User not created, invalid e-mail address provided.");
  }
};

async function getUser({ email, password }) {
  const user = await getUserByUsername(email);
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
  const {
    rows: [user],
  } = await client.query(
    `
    
    SELECT id, email FROM USERS
    WHERE id=$1;
    `,
    [userId]
  );
  return user;
}

async function getUserByEmail(email) {
  const {
    rows: [user],
  } = await client.query(
    `
    SELECT * FROM USERS
    WHERE email=$1
    `,
    [email]
  );

  return user;
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
};
