const express = require("express");
const {
  getLocations,
  getUserLocations,
  createLocation,
  updateLocation,
  getLocationById,
  deleteLocation,
} = require("../db/locations");
const { getUser, getUserByEmail } = require("../db/users");
const router = express.Router();
const { requireUser } = require("./utils");

router.get("/", async (req, res) => {
  const locations = await getLocations();
  res.send(locations);
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const locations = await getUserLocations(userId);
  res.send(locations);
});

router.post("/", requireUser, async (req, res, next) => {
  const { city, state, address, apartment, main, zipcode } = req.body;

  const user = await getUserByEmail(req.user.email);

  const userLocations = await getUserLocations(user.id);

  for (let location of userLocations) {
    if (location.address.toLowerCase() === address.toLowerCase()) {
      next({
        error: "LocationAlreadyExists",
        name: "Location Already Exists",
        message: `A location with the address: ${address} already exists under your account.`,
      });
    }
  }

  try {
    const location = await createLocation({
      userId: user.id,
      city,
      state,
      address,
      apartment,
      main,
      zipcode,
    });

    res.send(location);
  } catch (error) {
    next(error);
  }
});

router.patch("/:locationId", requireUser, async (req, res, next) => {
  const { locationId } = req.params;
  const { id, email } = req.user;
  const { city, state, address, apartment, main, zipcode } = req.body;
  const updateFields = { city, state, address, apartment, main, zipcode };
  const user = await getUserByEmail(email);
  Object.keys(updateFields).forEach(function (key, idx) {
    if (updateFields[key] === undefined) {
      delete updateFields[key];
    }
  });

  const userLocations = await getUserLocations(id);
  const _location = await getLocationById(locationId);

  if (!_location) {
    next({
      error: "LocationNotFound",
      name: "Location Not Found",
      message: `Unable to find size associated with ID: ${locationId}`,
    });
  }

  if (!user.admin && _location.userId !== id) {
    next({
      error: "NotYourLocation",
      message: `A location with the ID ${locationId} does not belong to you.`,
      name: "Not Your Location",
    });
  }

  if (address) {
    for (let location of userLocations) {
      if (location.address.toLowerCase() === address.toLowerCase()) {
        next({
          error: "LocationAlreadyExists",
          name: "Location Already Exists",
          message: `A location with the address: ${address} already exists under your account.`,
        });
      }
    }
  }
  try {
    const response = await updateLocation({
      id: _location.id,
      ...updateFields,
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:locationId", requireUser, async (req, res, next) => {
  const { locationId } = req.params;
  const location = await getLocationById(locationId);
  const user = await getUserByEmail(req.user.email);

  if (!location) {
    next({
      error: "LocationNotFound",
      name: "Location Not Found",
      message: `Unable to find size associated with ID: ${locationId}`,
    });
  }

  if (!user.admin && location.userId !== user.id) {
    next({
      error: "NotYourLocation",
      message: `A location with the ID ${locationId} does not belong to you.`,
      name: "Not Your Location",
    });
  }

  try {
    const removed = await deleteLocation(locationId);
    res.send({
      success: true,
      message: `${location.address} has successfully been deleted.`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
