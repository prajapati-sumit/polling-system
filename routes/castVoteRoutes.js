const { Router } = require('express');
const pollController = require('../controllers/castVoteController')

const router = Router();



// show Poll
router.post('/',pollController.findPoll);

// show required poll
router.get('/',pollController.getPoll);

//cast vote
router.post('/:id',pollController.castVote);

module.exports = router;
