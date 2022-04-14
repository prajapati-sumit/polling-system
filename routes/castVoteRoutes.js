const { Router } = require('express');
const pollController = require('../controllers/castVoteController')

const router = Router();




// show required poll
router.post('/',pollController.getPoll);

//cast vote
router.post('/:id',pollController.castVote);

module.exports = router;
