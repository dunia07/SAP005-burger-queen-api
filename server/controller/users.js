// aqui vai o código que acessa o banco de dados

const db = require('../db/models');

const getAllUsers = async (req, res) => {
  await db.Users.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((users) => {
      if (users.length === 0) {
        res.status(404).json({ message: 'There are no registered users' });
      }
      res.status(200).json(users);
    })
    .catch(() => res.status(400).json({
      message: 'Error processing request',
    }));
};

const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    restaurant,
    role,
  } = req.body;

  await db.Users.findOrCreate({
    where: { email },
    defaults: {
      email,
      name,
      password,
      role,
      restaurant,
    },
  })
    .then((createUsers) => {
      const create = createUsers[1];
      if (!create) {
        res.status(404).json({ message: 'E-mail already registered' });
      }
      res.status(201).json(createUsers);
    })
    .catch(() => res.status(400).json({
      message: 'Error creating user',
    }));
};

const getUserId = async (req, res) => {
  const userId = await db.Users.findByPk(req.params.id);

  if (!userId) {
    res.status(404).json({ message: 'User not found' });
  }

  await db.Users.findAll({
    attribute: { exclude: ['password'] },
    where: { id: req.params.id },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => res.status(400).json({
      message: 'Error processing request',
    }));
};

const updateUserId = async (req, res) => {
  const {
    name,
    password,
    role,
  } = req.body;

  const userId = await db.Users.findByPk(req.params.id);

  if (!userId) {
    res.status(404).json({ message: 'User not found' });
  }

  await db.Users.update({
    name,
    password,
    role,
  }, { where: { id: req.params.id } })

    .then(() => {
      res.status(200).json({
        message: 'Updated user',
      });
    })
    .catch(() => res.status(400).json({
      message: 'Error updating user',
    }));
};

const deleteUserId = async (req, res) => {
  const userId = await db.Users.findByPk(req.params.id);

  if (!userId) {
    res.status(404).json({ message: 'User not found' });
  }

  await db.Users.destroy({ where: { id: req.params.id } })
    .then(() => {
      req.status(200).json({
        message: 'User deleted',
      });
    })
    .catch(() => res.status(400).json({
      message: 'Error deleting user',
    }));
};

module.exports = {
  getAllUsers,
  createUser,
  getUserId,
  updateUserId,
  deleteUserId,
};
