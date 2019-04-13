const router = require('express').Router();

const userController = require('../controllers/UserController');

router.get('/', userController.list);
router.post('/add', userController.insert);
router.get('/update/:id', userController.detail);
router.post('/update/:id', userController.update);
router.get('/delete/:id', userController.delete);

module.exports = router;

