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


// find Poll
module.exports.findPoll = async(req, res) => {
    // update in the database
    // show single poll
    const pollId = req.params.id;

    const poll = await Poll.getPoll(pollId);
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

// show single poll
module.exports.getPoll = async (req,res) =>{
    const pollId = req.body.pollId;
    console.log(req.body);
    const poll = await Poll.getPoll(pollId);
    res.render('castvote/poll',{poll});
}
