const { Router } = require('express');
const pollController = require('../controllers/createPollController')

const router = Router();

//show all polls
router.get('/',pollController.getPolls);

// create a poll
router.post('/',pollController.addPollPost);

// create poll request 
router.get('/create',pollController.addPollGet);

// show a single poll
router.get('/:id',pollController.getPoll)
module.exports = router;
