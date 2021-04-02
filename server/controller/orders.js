/* eslint-disable camelcase */
// aqui vai o código que acessa o banco de dados

const db = require('../db/models');

const getAllOrders = (req, res) => {
  db.Orders.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.result(400).json({
      message: 'Error processing request',
    }));
};

const createOrder = (req, res) => {
  const {
    user_id,
    client_name,
    table,
    status,
    processedAt,
  } = req.body;

  db.Orders.create({
    user_id,
    client_name,
    table,
    status,
    processedAt,
  })
    .then((result) => {
      req.body.products.map((product) => {
        const itemProduct = db.Products.findByPk(product.id);
        if (!itemProduct) {
          return res.status(400).json({
            message: 'Error fetching product',
          });
        }

        const itemOrders = {
          order_id: result.id,
          product_id: product.id,
          qtd: product.qtd,
        };

        db.ProductOrders.create(itemOrders);

        return res.status(200).json(result);
      });
    })
    .catch(() => res.status(400).json({
      message: 'Error creating order',
    }));
};

const getOrderId = (req, res) => {
  db.Orders.findAll({
    where: { id: req.params.id },
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch(() => res.status(400).json({
      message: 'Error processing request',
    }));
};

const updateOrderId = (req, res) => {
  const {
    status,
  } = req.body;
  db.Orders.update({
    status,
  }, { where: { id: req.params.id } })

    .then(() => {
      res.status(200).json({
        message: 'Updated order',
      });
    })
    .catch(() => res.status(400).json({
      message: 'Error updating order',
    }));
};

const deleteOrderId = (req, res) => {
  db.Orders.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({
        message: 'Order deleted',
      });
    })
    .catch(() => res.status(400).json({
      message: 'Error deleting order',
    }));
};

module.exports = {
  getAllOrders,
  getOrderId,
  createOrder,
  updateOrderId,
  deleteOrderId,
};
