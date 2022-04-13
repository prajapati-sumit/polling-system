const Note = require('../models/Poll')



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
module.exports.getpolls = async (req, res) => {
    const user_id = res.locals.user._id;
    const notes = await Note.getpolls(user_id);
    res.locals.notes = notes;
    res.render('polls/contents');
}
//request for creating a poll
module.exports.addpolls_get = (req, res) => {
    res.render('polls/create');

}
// create poll
module.exports.addpolls_post = async (req, res) => {

    //get poll information
    const { user_id,text} = req.body;

    try {
        const note = await Note.create({user_id,text});
        res.status(201).json({ user: user_id });
    }
    catch (err) {
        // const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({ errors });
    }

}

// show single poll
module.exports.poll_get = async (req,res) =>{
    // console.log('this note:',req.params.id);
    const note_id = req.params.id;

    const note = await Note.getNote(note_id);
    res.render('notes/note',{note});
}
