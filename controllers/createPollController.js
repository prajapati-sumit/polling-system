const { response } = require('express');
const Poll = require('../models/Poll')







// show all polls
module.exports.getPolls = async (req, res) => {
    const user_id = res.locals.user._id;
    const polls = await Poll.getPolls(user_id);
    // res.locals.polls = polls;
    res.render('createpolls/contents',{polls});
}
//request for creating a poll
module.exports.addPollGet = (req, res) => {
    res.render('createpolls/create');

}
// create poll
module.exports.addPollPost = async (req, res) => {

    //get poll information
    const pollInfo = req.body;
    // console.log(pollInfo);
    try {
        const poll = await Poll.create({
            user_id:pollInfo.user_id,
            question:pollInfo.question,
            option1:{name:pollInfo.option1,count:0},
            option2:{name:pollInfo.option2,count:0},
            option3:{name:pollInfo.option3,count:0},
            option4:{name:pollInfo.option4,count:0},
        });
        res.render('createpolls/success',{poll});
    }
    catch (err) {
        // const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({ err });
    }

}

// show single poll
module.exports.getPoll = async (req,res) =>{
    const pollId = req.params.id;

    const poll = await Poll.getPoll(pollId);
    console.log(poll);
    res.render('createpolls/poll',{poll});
}
