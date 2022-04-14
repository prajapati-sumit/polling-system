const { restart } = require('nodemon');
const Poll = require('../models/Poll')



// handle errors
const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    if (err.message == 'incorrect email') {
        errors.email = 'that email is not registered';
    }
    if (err.message == 'incorrect password') {
        errors.password = 'that password is incorrect';
    }
    //duplicate error codes
    if (err.code == 11000) {
        errors.email = 'email is already registered';
        return errors;
    }
    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}



// show all polls
module.exports.getPolls = async (req, res) => {
    const user_id = res.locals.user._id;
    const polls = await Poll.getpolls(user_id);
    res.locals.polls = polls;
    res.render('createpolls/contents');
}
//request for creating a poll
module.exports.addPollGet = (req, res) => {
    res.render('createpolls/create');

}
// create poll
module.exports.addPollPost = async (req, res) => {
res.render('createpolls/success');
return;
    //get poll information
    const pollInfo = req.body;
    console.log(pollInfo);
    
    try {
        const poll = await Poll.create(pollInfo);
        res.status(201).json({ user: pollInfo.user_id });
    }
    catch (err) {
        // const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({ errors });
    }

}

// show single poll
module.exports.getPoll = async (req,res) =>{
    const pollId = req.params.id;

    const poll = await Poll.getPoll(pollId);
    res.render('createpolls/poll',{poll});
}
