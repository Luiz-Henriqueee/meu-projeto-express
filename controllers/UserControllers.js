const User = require('../models/UserModel');

const userController = {
  getAllUsers: async (_req, res) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.getById(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) return res.status(400).json({ error: 'name e email são obrigatórios' });
      const created = await User.create(name, email);
      res.status(201).json(created);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      const updated = await User.update(req.params.id, name, email);
      if (!updated) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(updated);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deleted = await User.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(deleted);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};

module.exports = userController;