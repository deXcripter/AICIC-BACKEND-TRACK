const { User } = require("../models/user.model");

async function createUser(req, res) {
  await User.create({
    firstName: "Sixtus",
    lastName: "Emmanuel",
    age: 20,
    password: "victor_77",
  });

  return res.status(501).send({ message: "Not implemented" });
}

function getAllUsers(req, res) {
  //
  return res.status(501).send({ message: "Not implemented" });
}

function getUser(req, res) {
  //
  return res.status(501).send({ message: "Not implemented" });
}

function updateUser(req, res) {
  //
  return res.status(501).send({ message: "Not implemented" });
}

function deleteUser(req, res) {
  //
  return res.status(501).send({ message: "Not implemented" });
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
