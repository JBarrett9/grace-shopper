require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { requireUser, requireAdmin } = require("./utils");
const {
  getUserByEmail,
  createUser,
  getUserById,
  updateUser,
} = require("../db/users");

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const SALT_COUNT = 10;
  if (!email || !password) {
    next({
      error: "MissingCredentials",
      name: "MissingCredentialsError",
      message: "Please supply both an e-mail address and password.",
    });
    return;
  }
  try {
    const user = await getUserByEmail(email);
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      let token = jwt.sign(user, JWT_SECRET, { expiresIn: "5h" });
      let userData = { id: user.id, email: user.email };
      res.send({
        user: userData,
        message: "you're logged in!",
        token,
      });
    } else {
      next({
        error: "IncorrectCredentialsError",
        name: "IncorrectCredentialsError",
        message: "E-mail address or password is incorrect.",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  const { email, password, name } = req.body;
  const validUser = await getUserByEmail(email);
  if (validUser) {
    next({
      error: "CannotRegisterUser",
      name: "UserAlreadyExists",
      message: `User ${username} is already taken.`,
    });
    return;
  }
  if (password.length < 8) {
    next({
      error: "InvalidPassword",
      name: "PasswordTooShort",
      message: "Password Too Short!",
    });
    return;
  }

  try {
    await createUser({ email, name, password });
    const user = await getUserByEmail(email);
    let userData = { id: user.id, email: user.email };
    let token = jwt.sign(user, JWT_SECRET, { expiresIn: "5h" });
    res.send({
      user: userData,
      message: "you're logged in!",
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:userId/admin/", requireAdmin, async (req, res, next) => {
  const { userId } = req.params;
  const { name, password, admin, birthday, active } = req.body;
  let updateFields = { name, password, admin, birthday, active };
  Object.keys(updateFields).forEach(function (key, idx) {
    if (updateFields[key] === undefined) {
      delete updateFields[key];
    }
  });

  const user = getUserById(userId);

  if (!user) {
    next({
      error: "UserNotFound",
      name: "User Not Found",
      message: "Unable to find a user associated to that ID.",
    });
  }

  try {
    const updatedUser = await updateUser({ id: userId, ...updateFields });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/:userId/edit/", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  const { name, password, birthday, active } = req.body;
  let updateFields = { name, password, birthday, active };
  Object.keys(updateFields).forEach(function (key, idx) {
    if (updateFields[key] === undefined) {
      delete updateFields[key];
    }
  });

  const user = getUserById(userId);

  if (!user) {
    next({
      error: "UserNotFound",
      name: "User Not Found",
      message: "Unable to find a user associated to that ID.",
    });
  }
  if (userId !== user.id && req.user.admin === false) {
    next({
      error: "UnauthorizedError",
      name: "UnauthorizedError",
      message: "You can only edit your own profile.",
    });
  }

  try {
    const updatedUser = await updateUser({ id: userId, ...updateFields });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me
router.get("/me", requireUser, async (req, res) => {
  const user = req.user;
  res.send(user);
});

module.exports = router;
