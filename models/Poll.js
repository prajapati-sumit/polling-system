const mongoose = require('mongoose');
const { ObjectId } = require('mongoose')


const pollSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'User not mentioned'],
    },
    question: {
        type: String,
        required: [true, 'The question cannot be empty']
    },
    option0:{
        type: String,
    },
    option1:{
        type: String,
    },
    option2:{
        type: String,
    },
    option3:{
        type: String,
    }
});


// fire a function after a doc saved to db
pollSchema.post('save', function (doc, next) {
    console.log('poll was created & saved', doc);
    next();

});


pollSchema.statics.getPolls = async function (user_id) {
    const polls = await this.find({ user_id: user_id });
    return polls;
}
pollSchema.statics.getPoll = async function (poll_id) {
    try {

        const poll = await this.findOne({ _id: poll_id });
        return poll;
    }
    catch (err) {
        console.log(err);
    }
}


const Poll = mongoose.model('poll', pollSchema);

module.exports = Poll;
