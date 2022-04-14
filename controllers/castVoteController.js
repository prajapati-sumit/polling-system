const Poll = require('../models/Poll')




// find Poll
module.exports.getPoll = async(req, res) => {

    const pollId = req.body.pollId;
    // const poll = await Poll.getPoll(pollId);
    const poll = {
        Id:pollId
    };
    if(true || poll)
        res.render('castvote/poll',{poll});
    else
        res.render('castvote/success');
}



// cast vote
module.exports.castVote = (req, res) => {
    // update in the database

    res.render('castvote/success');
}


