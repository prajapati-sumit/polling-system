const { Router } = require('express');
const noteController = require('../controllers/createPollController')

const router = Router();

//show all polls
router.get('/',noteController.getPolls);

// create a poll
router.post('/',noteController.addPollPost);

// create poll request 
router.get('/create',noteController.addPollGet);

// show a single poll
router.get('/:id',noteController.getPoll)
module.exports = router;
