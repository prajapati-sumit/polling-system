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
    option1:{
        type: {name:String,count:Number}
    },
    option2:{
        type: {name:String,count:Number}
    },
    option3:{
        type: {name:String,count:Number}
    },
    option4:{
        type: {name:String,count:Number}
    },

});


// fire a function after a doc saved to db
pollSchema.post('save', function (doc, next) {
    console.log('poll was created & saved');
    next();

});


pollSchema.statics.getPolls = async function (user_id) {
    try{
        const polls = await this.find({ user_id: user_id });
        return polls;
    }
    catch(err){
        console.log(err);
        return false;
    }
}
pollSchema.statics.getPoll = async function (poll_id) {
    try {

        const poll = await this.findOne({ _id: poll_id });
        return poll;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


const Poll = mongoose.model('poll', pollSchema);

module.exports = Poll;
