const { Router } = require('express');
const noteController = require('../controllers/pollController')

const router = Router();

router.get('/',noteController.getpolls);
router.post('/',noteController.addpolls_post);
router.get('/create',noteController.addpolls_get);
router.get('/:id',noteController.poll_get)
module.exports = router;
