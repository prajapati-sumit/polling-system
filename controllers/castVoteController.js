const { type } = require('express/lib/response');
const Poll = require('../models/Poll')




// find Poll
module.exports.getPoll = async (req, res) => {

    const pollId = req.body.pollId;
    const poll = await Poll.getPoll(pollId);

    if (poll)
        res.render('castvote/poll', { poll });
    else
        res.render('castvote/error', { message: 'The Poll Id is incorrect.' });

}


// cast vote
module.exports.castVote = async (req, res) => {
    // update in the database
    // const chosenOption = `option${req.body.option}.count`;
    // console.log(typeof("option3.count"),typeof(chosenOption));
    // console.log(chosenOption);
    const option = req.body.option;
    if(option=="1"){
        Poll.findByIdAndUpdate({ _id: req.body.pollId }, { $inc: { "option1.count": 1 } }, { new: true }, (err, updatedRecord) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Vote counted successfully");
                console.log(updatedRecord);
            }
        });
    }
    else if(option=="2"){
        Poll.findByIdAndUpdate({ _id: req.body.pollId }, { $inc: { "option2.count": 1 } }, { new: true }, (err, updatedRecord) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Vote counted successfully");
                console.log(updatedRecord);
            }
        });
    }
    else if(option=="3"){
        Poll.findByIdAndUpdate({ _id: req.body.pollId }, { $inc: { "option3.count": 1 } }, { new: true }, (err, updatedRecord) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Vote counted successfully");
                console.log(updatedRecord);
            }
        });
    }
    else{
        Poll.findByIdAndUpdate({ _id: req.body.pollId }, { $inc: { "option4.count": 1 } }, { new: true }, (err, updatedRecord) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Vote counted successfully");
                console.log(updatedRecord);
            }
        });
    }
    
    res.render('castvote/success');

}


