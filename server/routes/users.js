const { Router } = require('express');
const controller = require('../controller/users');

const router = Router();

// aqui vai as requisições
router.get("/", controller.getAllUsers);
router.post("/", controller.createUser);
router.get("/:id", controller.getUserId);
router.put("/:id", controller.updateUserId);
router.delete("/:id", controller.deleteUserId);

module.exports = router;