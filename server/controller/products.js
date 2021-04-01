/* eslint-disable camelcase */
// aqui vai o código que acessa o banco de dados

const db = require('../db/models');

const getAllProducts = (req, res) => {
  db.Products.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.status(400).json({
      message: 'Error processing request',
    }));
};

const createProduct = (req, res) => {
  const {
    name,
    price,
    flavor,
    complement,
    image, type,
    sub_type,
  } = req.body;
  db.Products.create({
    name,
    price,
    flavor,
    complement,
    image,
    type,
    sub_type,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => res.status(400).json({
      message: 'Error saving product',
    }));
};

const getProductId = (req, res) => {
  db.Products.findAll({
    where: { id: req.params.id },
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch(() => res.status(400).json({
      message: 'Error processing request',
    }));
};

const updateProductId = (req, res) => {
  const {
    price, complement, image,
  } = req.body;
  db.Products.update({
    price,
    complement,
    image,
  }, { where: { id: req.params.id } })

    .then(() => {
      res.status(200).json({
        message: 'Updated product',
      });
    })
    .catch(() => res.status(400).json({
      message: 'Error updating product',
    }));
};

const deleteProductId = (req, res) => {
  db.Products.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({
        message: 'Deleted product',
      });
    })
    .catch(() => res.status(400).json({
      message: 'Error deleting product',
    }));
};

module.exports = {
  getAllProducts,
  getProductId,
  createProduct,
  updateProductId,
  deleteProductId,
};
