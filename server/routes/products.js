const { Router } = require('express');
const controller = require('../controller/products');

const router = Router();

// aqui vai as requisições
router.get('/', controller.getAllProducts);
router.post('/', controller.createProduct);
router.get('/:id', controller.getProductId);
router.put('/:id', controller.updateProductId);
router.delete('/:id', controller.deleteProductId);

module.exports = router;
